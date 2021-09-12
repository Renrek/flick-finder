import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createViewing (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.post(`/api/viewing/new`, action.payload, config);
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
        yield put({ type: 'SET_LAST_ADDED_VIEWING', payload: response });
    } catch (error) {
        
    }
}
function* viewingSaga() {
    yield takeLatest('CREATE_VIEWING', createViewing);
    yield takeLatest('FETCH_LAST_ADDED_VIEWING', fetchLastAddedViewing);
}

export default viewingSaga;
