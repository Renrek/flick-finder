const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', async ( req, res ) => {
 
    try {
        // Grab movie genres
        let genres;
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/genre/movie/list',
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'en-US'
                }
            });  
            genres = response.data.genres;
        } catch (error) {
            console.log('Recommendation genre fetch',error);
            res.sendStatus(500);   
        }

        //Grab user's movies
        let movies = [];
        const statement = `
            SELECT "uma"."id", "uma"."movieId", "a"."value" as "anticipation" 
            FROM "userMovieAnticipation" "uma"
            JOIN "anticipation" "a"
                ON ("a"."id" = "uma"."anticipationId")
            WHERE "userId" = $1
            ORDER BY "id" LIMIT 100`;

        const result = await db.query(statement, [ 1 ]); //req.user.id

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

                movies.push({ ...movie, data: tmdb.data});

            } catch (error) {

                console.log('err',error);
                res.sendStatus(500);

            }
        }));
        
        let jsMovieGenres = []; // Array to give to TensorFlow
        let jsPreferences =[[]]; //2D array to match jsMovieGenres
        let jsGenres = []; // Array to store the Human readable
        // Cycle through genres array and pull out name property
        jsGenres.push(genres.map( g => g.name));
        // Loop through each movie
        for (const movie of movies) {
            console.log('title', movie.data.original_title);
            jsPreferences[0].push(movie.anticipation)
            // Put the genres of the move into a nice clean array
            let movieArrayOfGenresIds = [];
            movie.data.genres.map( genre => movieArrayOfGenresIds.push(genre.id) );
            
            // Each movie will have an array of boolean values per genre
            let genreBooleanArray = [];
            for (const genre of genres) {
                
                if (movieArrayOfGenresIds.includes(genre.id)) {
                    genreBooleanArray.push(1)
                } else {
                    genreBooleanArray.push(0)
                }

            }
            jsMovieGenres.push(genreBooleanArray)
        }
        console.log('result', jsMovieGenres);
        console.log('jsPref', jsPreferences);
        console.log('jsGenres', jsGenres);
        
        
        
        res.sendStatus(200)
    } catch (error) {
        console.log('Recommendation house is on fire',error);
        res.sendStatus(500); 
    }
    
    
}); 

module.exports = router;