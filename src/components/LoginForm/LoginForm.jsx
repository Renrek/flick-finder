/**** SYSTEM ****/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**** MATERIAL UI ****/
import { makeStyles } from '@material-ui/core';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  forms:{
    '& > *': {
        margin: 10,
        width:'95%',
    },
},
});

function LoginForm() {
  /**** HOOKS ****/
  const dispatch = useDispatch();
  const classes = useStyles();

  /**** STATE ****/
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const errors = useSelector(store => store.errors);
  
  //Initiate Login
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Paper>  
      <Typography variant="h5">Login</Typography>
      <form className={classes.forms} onSubmit={login}>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <TextField 
          required
          name="username"
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField 
          required
          name="password"
          label="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button 
          type="submit" 
          name="submit"
          variant="contained"
          color="primary"
        >
            Log In
        </Button>
    </form>
    </Paper>
  );
}

export default LoginForm;
