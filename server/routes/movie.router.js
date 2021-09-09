const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US',
      include_adult: 'false',
      query: 'Star Wars'
    }
  })
  .then(response => {
    console.log('axios response', response.data);
    res.send(response.data);
  }).catch(err => {
    console.log('err',err);
    
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;