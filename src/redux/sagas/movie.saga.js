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

function* fetchMovie(action){
    
}

function* fetchGenres(){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/movie/genres`, config);
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
        console.log('Movie Search get request failed', error);
    }
}

function* saveAnticipation(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.put(`/api/movie/anticipation`, action.payload, config);
        yield put({ type: 'FETCH_MOVIE_LIST'});
    } catch (error) {
        console.log('Save anticipation failed', error);
    }
}

function* deleteMovie(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.delete(`/api/movie/${action.payload}`, config);
        yield put({ type: 'FETCH_MOVIE_LIST'});
    } catch (error) {
        console.log('Delete movie failed', error);
    }
}

function* movieSaga() {
    yield takeLatest('FETCH_ANTICIPATION_RATINGS', fetchAnticipationRatings);
    yield takeLatest('FETCH_MOVIE_SEARCH', fetchMovieSearch);
    yield takeLatest('FETCH_MOVIE_LIST', fetchMyMovies);
    yield takeLatest('SAVE_MOVIE', saveMovie);  
    yield takeLatest('FETCH_MOVIE', fetchMovie);
    yield takeLatest('FETCH_GENRES', fetchGenres);
    yield takeLatest('SAVE_ANTICIPATION', saveAnticipation);
    yield takeLatest('DELETE_MOVIE', deleteMovie);
}
  
export default movieSaga;