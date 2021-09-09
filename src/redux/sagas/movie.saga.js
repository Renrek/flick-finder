import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
    
}

function* movieSaga() {
    yield takeLatest('FETCH_MOVIE_SEARCH', fetchMovieSearch);
    yield takeLatest('SAVE_MOVIE', saveMovie)
    
}
  
export default movieSaga;