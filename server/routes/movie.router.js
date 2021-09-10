const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/anticipation-ratings', rejectUnauthenticated, (req,res) => {

  const statement = `SELECT "id", "value", "name" FROM "anticipation"`
  db.query(statement)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get ratings', err);
      res.sendStatus(500)
    })
});

router.get('/my-list', rejectUnauthenticated, (req,res) => {

  const statement = `SELECT "id", "movieId", "anticipationId" FROM "userMovieAnticipation" WHERE "userId" = $1`
  db.query(statement, [ req.user.id ])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get my-movies', err);
      res.sendStatus(500)
    })
});

router.get('/genres', rejectUnauthenticated, (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US'
    }
  })
  .then(response => {
    res.send(response.data.results);
  })
  .catch(err => {
    console.log('err',err);
    res.sendStatus(500);
  });
});

router.get('/:string', rejectUnauthenticated, (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US',
      include_adult: 'false',
      query: req.params.string
    }
  })
  .then(response => {
    res.send(response.data.results);
  })
  .catch(err => {
    console.log('err',err);
    res.sendStatus(500);
  });
});


router.post('/', (req, res) => {
  const statement = `INSERT INTO "userMovieAnticipation" ( "movieId", "userId", "anticipationId" ) VALUES ( $1, $2, $3 );`;

  db.query(statement, [ req.body.movieId, req.user.id, req.body.anticipationId ])
    .then( result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('ERROR: Post contacts', err);
      res.sendStatus(500)
    })
});



module.exports = router;