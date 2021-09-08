import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import AddMovie from '../AddMovie/AddMovie';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';


/**** MATERIAL UI ****/
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';

/**** STYLING Colors ****/
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

/**** APP Theme ****/
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
    background: {
      default: grey[500],
    },
  },
});



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
                component={AddMovie}
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
                  <Redirect to="/user" />
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
                  <Redirect to="/user" />
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
