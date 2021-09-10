import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAnticipationRatings(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/movie/anticipation-ratings`, config);
        yield put({ type: 'SET_ANTICIPATION_OPTIONS', payload: response.data });
    } catch (error) {
        console.log('Movie Search get request failed', error);
    }
}

function* fetchMovieSearch(action){
    console.log('actionPayload',action.payload);
    
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/movie/${action.payload}`, config);
        yield put({ type: 'SET_MOVIE_SEARCH', payload: response.data });
    } catch (error) {
        console.log('Movie Search get request failed', error);
    }
}

function* saveMovie(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.post(`/api/movie/`, action.payload, config);
    } catch (error) {
        console.log('Save movie post request failed', error);
    }
}

function* fetchMyMovies(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/movie/my-list`, config);
        yield put({ type: 'SET_MOVIE_LIST', payload: response.data });
    } catch (error) {
        console.log('Save movie post request failed', error);
    }
}

function* movieSaga() {
    yield takeLatest('FETCH_ANTICIPATION_RATINGS', fetchAnticipationRatings);
    yield takeLatest('FETCH_MOVIE_SEARCH', fetchMovieSearch);
    yield takeLatest('FETCH_MOVIE_LIST', fetchMyMovies)
    yield takeLatest('SAVE_MOVIE', saveMovie);    
}
  
export default movieSaga;