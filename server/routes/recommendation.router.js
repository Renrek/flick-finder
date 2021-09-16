const { default: axios } = require('axios');
const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const tf = require('@tensorflow/tfjs');


router.get('/', rejectUnauthenticated, async ( req, res ) => {
 
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

                movies.push({ ...movie, data: tmdb.data});
                
            } catch (error) {

                console.log('err',error);
                res.sendStatus(500);

            }
        }));
        
        let jsMovieGenres = []; // Array of Movie genres arrays to give to TensorFlow
        let jsPreferences =[[]]; // 2D array to match jsMovieGenres

        // Loop through each movie
        for (const movie of movies) {
            
            jsPreferences[0].push(movie.anticipation)
            // Put the genres of the move into a nice clean array
            let movieArrayOfGenresIds = [];
            movie.data.genres.map( genre => movieArrayOfGenresIds.push(genre.id) );
            
            // Each movie will have an array of boolean values per genre
            let genreBooleanArray = [];
            for (const genre of genres) {
                // If 
                if (movieArrayOfGenresIds.includes(genre.id)) {
                    genreBooleanArray.push(1)
                } else {
                    genreBooleanArray.push(0)
                }

            }
            jsMovieGenres.push(genreBooleanArray)
        }
        // console.log('result', jsMovieGenres);
        // console.log('jsPref', jsPreferences);
        // console.log('jsGenres', jsGenres);
        
        //console.log(tf.version.tfjs);

        let rankedGenres;
        await tf.tidy(() => {
            // Movie tastes of the user
            const preferences = tf.tensor(jsPreferences);
            // Grid ( 2D Array ) of boolean values in regard to movie genres
            const movieGenres = tf.tensor(jsMovieGenres);
            // Matrix multiplication operation - Neo would be proud
            const preferedGenres = tf.matMul(preferences, movieGenres);

            //preferedGenres.print();
            const topPreferedGenres = tf.topk(preferedGenres, genres.length);
            const topGenres = topPreferedGenres.indices.arraySync();

            rankedGenres = topGenres[0].map(v => genres[v]);
        })
        //console.log('top ranked', rankedGenres);
        
        try {

            let tmdb = await axios({
              method: 'GET',
              url: `https://api.themoviedb.org/3/discover/movie/`,
              params: {
                language: 'en-US',
                api_key: process.env.TMDB_API_KEY,
                with_genres: `${rankedGenres[0].id},${rankedGenres[1].id},${rankedGenres[2].id}`
              }
            });
    
            //myList.push({ ...movie, data: tmdb.data});
            //console.log('TTTTMMMMDDDDBBBB', tmdb.data);
            res.send({ topThreeGenres: [ rankedGenres[0].name, rankedGenres[1].name, rankedGenres[2].name ], data: tmdb.data.results })
          } catch (error) {
    
            console.log('err',error);
            res.sendStatus(500);
    
          }

          console.log('The tf message would be helpful if tf-node worked on Apple M1 chips');
          
    } catch (error) {
        console.log('Recommendation tf HOUSE IS ON FIRE',error);
        res.sendStatus(500); 
    }
    
    
}); 

module.exports = router;