import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createViewing (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.post(`/api/viewing/new`, action.payload, config);
        yield put({ type: 'FETCH_LAST_ADDED_VIEWING' });
        yield put({ type: 'UNSET_VIEWER_LIST' });
    } catch (error) {
        console.log('Contact save request failed', error);
    }
}

function* fetchLastAddedViewing () {
   
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/viewing/last-added`, config);
        const movieDetails = yield axios.get(`/api/movie/single/${response.data[0].movieId}`, config);
        
        yield put({ type: 'SET_LAST_ADDED_VIEWING', payload: { ...response.data[0], movieDetails: movieDetails.data } });
    } catch (error) {
        
    }
}

function* viewingSaga() {
    yield takeLatest('CREATE_VIEWING', createViewing);
    yield takeLatest('FETCH_LAST_ADDED_VIEWING', fetchLastAddedViewing);
}

export default viewingSaga;
