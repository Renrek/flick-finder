const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;