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

function* deleteContact(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.delete(`/api/contacts/${action.payload}`, config);
        yield put({ type: 'FETCH_CONTACTS', payload: response.data });
    } catch (error) {
        console.log('Contact delete request failed', error);
    }
}

function* saveContact(action){
    try {
        console.log('act',action.payload);
        
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.post(`/api/contacts/`, action.payload, config);
        yield put({ type: 'FETCH_CONTACTS', payload: response.data });
        yield put({ type: 'SET_CONTACTS_SEARCH', payload: [] })
    } catch (error) {
        console.log('Contact save request failed', error);
    }
}

function* contactsSaga() {
    yield takeLatest('FETCH_CONTACTS', fetchContacts);
    yield takeLatest('FETCH_CONTACTS_SEARCH', fetchContactSearch);
    yield takeLatest('DELETE_CONTACT', deleteContact);
    yield takeLatest('SAVE_CONTACT', saveContact);
  }
  
  export default contactsSaga;