
# FLICK FINDER

## Description

_Duration: 2 Week Sprint_

Our household has a vast collection of movies that we want to watch, and we can never decide on one in a timely manner. Due to collective indecisiveness, we could have watched half a film in the time that it took to decide on one. This is a major frustration for me in that it is a waste of time where I could be productive. Prior to my enrollment in this course, this was a project that was desired by my whole family. I had the intention to write it using PHP/MariaDB in conjunction with Laravel to make a mobile-friendly web app, but like many other to-do projects, it never got started. Developing this app was not just to be a show piece but to be a functional and usable tool.

To see the fully functional site, please visit: [https://powerful-sands-58748.herokuapp.com/](https://powerful-sands-58748.herokuapp.com/#/home)

## Screen Shot

![AddMovies](documentation/images/addMovies.gif)

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [tmdb api key](https://www.themoviedb.org/)

## Installation

1. Add tmdb api key to `.env` i.e. `TMDB_API_KEY=keyGoesHere`
1. Create a database named `flick_finder`,
1. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
1. Open up your editor of choice and run an `npm install`
1. Run `npm run server` in a terminal within the root directory of the project.
1. Run `npm run client` in another terminal within the root directory of the project.
1. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Register with a username and password.
1. Add some movies by navigating through the Add Movie on the menu, rate them based on your anticipation to watch them.
1. Add some contacts by navigating to My Contacts. Note: only available if other
users were added.
1. Create a viewing by selecting a date and any contacts that are attending,
it is okay to have a solo viewing. Once the schedule button has a movie will be
randomly selected from the top five most anticipated movies of the participates.
1. After you have had a chance to preview the movie that was selected for the scheduled viewing, navigate 
to the home page through the menu. On the home page you will see the next scheduled viewing and a recommendation list generated by a simple tensorflow recommendation engine.


## Built With

- [The Movie DB](https://www.themoviedb.org/)
- React
- Express.js
- PostgreSQL
- Material UI
- TensorFlow.js


## Acknowledgement
- Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.
- I especially want to thank my cohort - Mersenne. My education through Prime would not have been possible without them.


## Support
If you have suggestions or issues, please email me at [brad.d.johansen@gmail.com](mailto:brad.d.johansen@gmail.com)

