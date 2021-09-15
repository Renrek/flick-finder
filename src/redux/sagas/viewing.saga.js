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
        console.log('Fetch last added viewing failed', error);
    }
}

function* fetchNextViewing() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/viewing/next-viewing`, config);
        const movieDetails = yield axios.get(`/api/movie/single/${response.data[0].movieId}`, config);
        yield put({ type: 'SET_NEXT_VIEWING', payload: { ...response.data[0], movieDetails: movieDetails.data } });
    } catch (error) {
        console.log('Fetch next viewing failed', error);
    }
}

function* fetchViewingToEdit(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/viewing/${action.payload}`, config);
        const movieDetails = yield axios.get(`/api/movie/single/${response.data[0].movieId}`, config);
        yield put({ type: 'SET_VIEWING_EDIT', payload: { ...response.data[0], movieDetails: movieDetails.data } });
    } catch (error) {
        console.log('Fetch next viewing failed', error);
    }
}

function* saveViewingDate(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.put(`/api/viewing/save-date/${action.payload.id}`, { date: action.payload.date } , config);
        yield put({ type: 'FETCH_VIEWING_TO_EDIT', payload: action.payload.id});
    } catch (error) {
        console.log('save viewing date failed', error);
    }
}

function* viewingSaga() {
    yield takeLatest('CREATE_VIEWING', createViewing);
    yield takeLatest('FETCH_LAST_ADDED_VIEWING', fetchLastAddedViewing);
    yield takeLatest('FETCH_NEXT_VIEWING', fetchNextViewing);
    yield takeLatest('FETCH_VIEWING_TO_EDIT', fetchViewingToEdit);
    yield takeLatest('SAVE_VIEWING_DATE', saveViewingDate)
}

export default viewingSaga;
