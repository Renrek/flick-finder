import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import theme from './theme';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

/**** ROUTES ****/
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import AddMoviePage from '../AddMoviePage/AddMoviePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyMoviesPage from '../MyMoviesPage/MyMoviesPage';
import MyContactsPage from '../MyContactsPage/MyContactsPage';
import CreateViewingPage from '../CreateViewingPage/CreateViewingPage';
import ViewingScheduled from '../ViewingScheduled/ViewingScheduled';


/**** MATERIAL UI ****/
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';
import FeedPage from '../FeedPage/FeedPage';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Nav />
          <Container maxWidth="xs">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route 
                exact 
                path="/about" 
                component={AboutPage} 
              />
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
                component={UserPage}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/add-movie"
                component={AddMoviePage}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/my-movies"
                component={MyMoviesPage}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/my-contacts"
                component={MyContactsPage}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/create-viewing"
                component={CreateViewingPage}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/viewing-scheduled"
                component={ViewingScheduled}
              />
              <ProtectedRoute 
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/feed"
                component={FeedPage}
              />
              <Route
                exact
                path="/login"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to="/user" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>
              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/feed" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>
              <Route
                exact
                path="/home"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/feed" />
                  :
                  // Otherwise, show the Landing page
                  <LandingPage />
                }
              </Route>
              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
            <Footer />
          </Container>   
        </Router>
      </ThemeProvider>
    
    
  );
}

export default App;
