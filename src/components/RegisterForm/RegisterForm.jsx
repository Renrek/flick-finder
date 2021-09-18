/**** SYSTEM ****/
import React, { useState } from 'react';
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

function RegisterForm() {
  /**** HOOKS ****/
  const dispatch = useDispatch();
  const classes = useStyles();

  /**** STATE ****/
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Paper>
      <Typography variant="h5">Register User</Typography>
      <form className={classes.forms} onSubmit={registerUser}>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
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
            Register
        </Button>
      </form>
    </Paper>
  );
}

export default RegisterForm;
