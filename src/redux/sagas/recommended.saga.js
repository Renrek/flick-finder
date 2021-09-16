import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRecommended(){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/recommendation/`, config);
        yield put({ type: 'SET_RECOMMENDED', payload: response.data });
    } catch (error) {
        console.log('Recommendation failed', error);
    }
}

function* recommendedSaga() {
    yield takeLatest('FETCH_RECOMMENDED', fetchRecommended)
}
  
export default recommendedSaga;