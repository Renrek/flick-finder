const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/new', rejectUnauthenticated, async ( req, res ) => {

    //Establish Connection to database
    const client = await db.connect();

    //Essayons - French - Combat Engineer Motto - "Let us try"
    try {

        await client.query('BEGIN');
        
        const viewerRecords = await client.query(`
            SELECT`)
    } catch (error) {
        
    }
});

module.exports = router;