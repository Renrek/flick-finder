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

        let where = ''; // Used to construct select statement
        let getMoviesParams = [ req.user.id ] // starts with the user
        let paramIndex = 2; // Starts at two becouse the user is in postion $1
        
        // Programmatically create Sql statement componant, trying to
        // NOT curcumvent injection protection.
        for (const viewerId of req.body.viewers) {
            // Number() - A little extra security make sure its a number 
            // and not bobby tables... just becouse, I will sleep a little better.
            getMoviesParams.push(Number(viewerId)); 
            where += ` OR "uma"."userId" = $${paramIndex}`
            paramIndex++
        }
        
        // Fetch the top 5 movies with the highest combined anticipation,
        // values of the participating viewers.

        let getMoviesStatement = `
            SELECT "uma"."movieId", SUM("a"."value") "value"
            FROM "userMovieAnticipation" "uma"
            JOIN "anticipation" "a" ON
                ("a"."id" = "uma"."anticipationId")
            WHERE "uma"."userId" = $1 ${where}
            GROUP BY "uma"."movieId"
            ORDER BY "value" DESC
            LIMIT 5
        `;

        // Grab top five compiled movie preferences
        const viewerRecords = await client.query(getMoviesStatement, getMoviesParams);
        
        // Create a random int based on the lenght of records (5) oh.. and its faux random lol
        const randomSelection = Math.floor(Math.random()*viewerRecords.rows.length);

        // Identify the movie based on the random int that was generated.
        const selectedMovie = viewerRecords.rows[randomSelection].movieId;

        const setMovieStatement = `
            INSERT INTO "viewing" ( "movieId", "viewingDate" ) 
            VALUES ( $1, $2 )
            RETURNING "id"`;

        //Insert viewing selection into database
        const setMovieReturn = await client.query(setMovieStatement, [ selectedMovie, req.body.viewingDate ]);

        //ID of record added to pass on to the client.
        const movieReturnId = setMovieReturn.rows[0].id
        
        const setViewersStatement = `
            INSERT INTO "userViewing" ( "userId", "viewingId", "isHost" )
            VALUES ( $1, $2, $3 );
        `;

        // Insert host record into userViewing, signifies ability to edit viewing
        await client.query(setViewersStatement, [ req.user.id, movieReturnId, true]);

        // Insert the remaining viewers into userViewing
        await Promise.all(req.body.viewers.map(viewerId => {
            const viewerParams = [viewerId, movieReturnId, false];
            return client.query(setViewersStatement, viewerParams);
        }));

        // Everything went well, commit all work to the database.
        await client.query('COMMIT');
        
        // Hurray DONE!
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK');
        console.log('error', error);
        
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

module.exports = router;