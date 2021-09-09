import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchContacts(){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('/api/contacts/current', config);
        yield put({ type: 'SET_CONTACTS', payload: response.data });
    } catch (error) {
        console.log('Contacts get request failed', error);
    }
    
}

function* fetchContactSearch(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/contacts/search/${action.payload}`, config);
        yield put({ type: 'SET_CONTACTS_SEARCH', payload: response.data });
    } catch (error) {
        console.log('Contact Search get request failed', error);
    }
}
function* contactsSaga() {
    yield takeLatest('FETCH_CONTACTS', fetchContacts);
    yield takeLatest('FETCH_CONTACTS_SEARCH', fetchContactSearch)
  }
  
  export default contactsSaga;