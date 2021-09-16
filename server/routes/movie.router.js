const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Delete user movie record by id
router.delete('/remove/:id', rejectUnauthenticated, (req, res) => {
  
  const statement = `DELETE FROM "userMovieAnticipation" WHERE id = $1`;

  db.query(statement, [ req.params.id ])
    .then( result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR: Delete movie', err);
      res.sendStatus(500)
    })
});

// Fetch a single movie from TMDB
router.get('/single/:id', rejectUnauthenticated, (req, res) => {
  
  axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${req.params.id}`,
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })
  .then(response => {
    res.send(response.data); 
  })
  .catch(err => {
    console.log('err',err);
    res.sendStatus(500);
  });

});

// Values for created Select inputs.
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

// Update users anticipation for a specific movie
router.put('/anticipation', rejectUnauthenticated, (req,res) => {
  const statement = `
    UPDATE "userMovieAnticipation" 
    SET "anticipationId" = $1
    WHERE id = $2`
  db.query(statement, [ req.body.anticipationId, req.body.id ])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get ratings', err);
      res.sendStatus(500)
    })
});

// Big api call to TMDB - it only returns one movie at a time so I had to
// programically/async the calls.
router.get('/my-list', rejectUnauthenticated, async (req,res) => {
  let myList = [];
  
  try {

    const statement = `
      SELECT "id", "movieId", "anticipationId" 
      FROM "userMovieAnticipation" WHERE "userId" = $1
      ORDER BY "id" LIMIT 100`;

    const result = await db.query(statement, [ req.user.id ]);

    //Cycle through sql results and add TMDB data to the information
    await Promise.all(result.rows.map( async (movie) => {
      try {

        let tmdb = await axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${movie.movieId}`,
          params: {
            api_key: process.env.TMDB_API_KEY
          }
        });

        myList.push({ ...movie, data: tmdb.data});

      } catch (error) {

        console.log('err',error);
        res.sendStatus(500);

      }
    }));

    // Return payload
    // format [{id:, movieId:, anticipationId:, data:{api_results}}, ]
    res.send(myList);

  } catch (error) {

    console.log('ERROR: Get my-movies', error);
    res.sendStatus(500);

  }

});

// Return genres from TMDB api
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
    res.send(response.data.genres);
  })
  .catch(err => {
    console.log('err',err);
    res.sendStatus(500);
  });
});

// Api call to TMDB searching for a movie by string
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

// Adding a movie to the users list of movies
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