/**** SYSTEM ****/
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Fab,
  Typography,
  Toolbar
} from '@material-ui/core';

/**** ICONS ****/
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import MenuIcon from '@material-ui/icons/Menu';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';


const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  bar: {
    marginBottom: 20,
  },
});

function Nav() {

  /**** HOOKS ****/
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  /**** STATE ****/
  const [ drawerIsVisable , setDrawerIsVisable ] = React.useState(false);
  const user = useSelector((store) => store.user);

  // Controls the side menu visablitity
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerIsVisable(open);
  };

  // Log the user out
  const handleLogOut = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch({ type: 'LOGOUT' });
    setDrawerIsVisable(open);
    history.push('/home');
  };

  return (
    <>
    <SwipeableDrawer
      anchor="right"
      open={drawerIsVisable}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <List>
        {user.id === null && ( // Visable if NOT logged in
        <ListItem component={Link} to="/login" onClick={toggleDrawer(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText> Login / Register </ListItemText>
        </ListItem>
        )}
        
        <ListItem component={Link} to="/feed" onClick={toggleDrawer(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText> Home </ListItemText>
        </ListItem>
        {user.id && ( // Visable if user is logged in
        <>
        <ListItem component={Link} to="/create-viewing" onClick={toggleDrawer(false)}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>
              Create Viewing
          </ListItemText>
        </ListItem>
        <ListItem component={Link} to="/add-movie" onClick={toggleDrawer(false)}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>
              Add Movie
          </ListItemText>
        </ListItem>
        <ListItem component={Link} to="/my-movies" onClick={toggleDrawer(false)}>
          <ListItemIcon><LocalMoviesIcon /></ListItemIcon>
          <ListItemText>
              My Movies
          </ListItemText>
        </ListItem>
        <ListItem component={Link} to="/my-viewings" onClick={toggleDrawer(false)}>
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText>
              My Viewings
          </ListItemText>
        </ListItem>
        <ListItem component={Link} to="/my-contacts" onClick={toggleDrawer(false)}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText>
              My Contacts
          </ListItemText>
        </ListItem>
      </>
        )}
        <ListItem component={Link} to="/about" onClick={toggleDrawer(false)}>
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText>
          About
        </ListItemText>
      </ListItem>
      {user.id && ( // Visable if user is logged in
      <ListItem onClick={handleLogOut(false)}>
        <ListItemIcon><CancelPresentationIcon /></ListItemIcon>
        <ListItemText>
          LogOut
        </ListItemText>
      </ListItem>
      )}
      </List>
    </SwipeableDrawer>
    <AppBar color="secondary" position="sticky" className={classes.bar}>
      <Toolbar>
      <Typography variant="h4" className={classes.title}>Flick Finder</Typography>
      
      <Fab onClick={toggleDrawer(true)} size="medium">
        <MenuIcon />
      </Fab>
      </Toolbar>
    </AppBar>
    </>
  );
}

export default Nav;
