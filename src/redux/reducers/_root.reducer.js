import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import contacts from './contacts.reducer';
import contactSearch from './contactSearch.reducer';
import movieSearch from './movieSearch.reducer';
import anticipationOptions from'./anticipationOptions.reducer';
import movieList from './movieList.reducer';
import genres from './genres.reducer';
import viewerList from './viewers.reducer';
import lastAddedViewing from './lastAddedViewing.reducer';
import nextViewing from './nextViewing.reducer';
import editViewing from './editViewing.reducer';
import viewingList from './viewingList.reducer';
import recommended from './recommended.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  contacts, // array of contacts for user
  contactSearch, // results of a contact search 
  movieSearch,
  anticipationOptions,
  movieList,
  genres,
  viewerList,
  lastAddedViewing,
  nextViewing,
  editViewing,
  viewingList,
  recommended,
});

export default rootReducer;
