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
  SwipeableDrawer
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
        <ListItem component={Link} to="/user" onClick={toggleDrawer(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>
          
              Home
            
          </ListItemText>
        </ListItem>
        <ListItem>
        <ListItemIcon><AddIcon /></ListItemIcon>
        <ListItemText>
        <Link className="navLink" to="/info">
              Add Movie
            </Link>
        </ListItemText>
      </ListItem>
      <ListItem>
      <LogOutButton className="navLink" />
      </ListItem>
      </>
        )}
        <ListItem>
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText component={Link} to="/about" onClick={toggleDrawer(false)}>
        
          About
        
        </ListItemText>
      </ListItem>
      
      </List>
    </SwipeableDrawer>
    <AppBar position="sticky">
      
        <h2 className="nav-title">Prime Solo Project</h2>
      
     
    </AppBar>
    </>
  );
}

export default Nav;
