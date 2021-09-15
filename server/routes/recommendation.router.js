const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/',  ( req, res ) => {
    res.send("HELLO")
}); 

module.exports = router;