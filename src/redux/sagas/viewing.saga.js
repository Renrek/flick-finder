import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createViewing (action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.post(`/api/viewing/new`, action.payload, config);
        //yield put({ type: 'UNSET_VIEWER_LIST' });
        console.log('repsonse view', response);
    } catch (error) {
        console.log('Contact save request failed', error);
    }
}

function* viewingSaga() {
    yield takeLatest('CREATE_VIEWING', createViewing)
}

export default viewingSaga;
