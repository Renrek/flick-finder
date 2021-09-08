import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

import { useSelector } from 'react-redux';

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

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import SearchIcon from '@material-ui/icons/Search';
import { FullscreenExitTwoTone } from '@material-ui/icons';

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
  const classes = useStyles();

  const [ drawerIsVisable , setDrawerIsVisable ] = React.useState(false);

  const user = useSelector((store) => store.user);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerIsVisable(open);
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
        {/* If no user is logged in, show these links */}
        {user.id === null && (
        <ListItem component={Link} to="/login" onClick={toggleDrawer(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>
            
              Login / Register
            
          </ListItemText>
        </ListItem>
        )}
        
        <ListItem component={Link} to="/user" onClick={toggleDrawer(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>
          
              Home
            
          </ListItemText>
        </ListItem>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
        <ListItem component={Link} to="/add-movie" onClick={toggleDrawer(false)}>
        <ListItemIcon><AddIcon /></ListItemIcon>
        <ListItemText>
              Add Movie
        </ListItemText>
      </ListItem>
      <ListItem>
      <LogOutButton className="navLink" />
      </ListItem>
      </>
        )}
        <ListItem component={Link} to="/about" onClick={toggleDrawer(false)}>
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText>
        
          About
        
        </ListItemText>
      </ListItem>
      
      </List>
    </SwipeableDrawer>
    <AppBar position="sticky" className={classes.bar}>
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
