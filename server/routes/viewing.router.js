const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/new', rejectUnauthenticated, async ( req, res ) => {
    console.log('bod', req.body);
    
    //Establish Connection to database
    const client = await db.connect();

    //Essayons - French - Combat Engineer Motto - "Let us try"
    try {

        await client.query('BEGIN');
        
        let where = '';
        let params = [ req.user.id ]
        let paramIndex = 2;
        for (const viewerId of req.body.viewers) {
            // Number(A little extra security make sure its a number and not bobby tables...)
            params.push(Number(viewerId)); 
            where += ` OR "uma"."userId" = $${paramIndex}`
            paramIndex++
        }

        
        let statement = `
            SELECT "uma"."movieId", SUM("a"."value") "value"
            FROM "userMovieAnticipation" "uma"
            JOIN "anticipation" "a" ON
                ("a"."id" = "uma"."anticipationId")
            WHERE "uma"."userId" = $1 ${where}
            GROUP BY "uma"."movieId"
            ORDER BY "value" DESC
            LIMIT 5
        `;
        
        
        const viewerRecords = await client.query(statement, params);
        console.log('viewing', viewerRecords);
        const randomNumber = Math.floor(Math.random()*viewerRecords.rows.length)
        const randomRecord = viewerRecords.rows[randomNumber];
        console.log('rdo', randomRecord);
        
        res.sendStatus(201)
    } catch (error) {
        await client.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

module.exports = router;