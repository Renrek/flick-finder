/**** SYSTEM ****/
import React from 'react';
import { useHistory } from 'react-router-dom';

/**** COMPONENTS ****/
import LoginForm from '../LoginForm/LoginForm';

/**** MATERIAL UI ****/
import { Button, Box, Typography } from '@material-ui/core';

function LoginPage() {

  /**** HOOKS ****/
  const history = useHistory();

  return (
    <Box>
      <LoginForm />
      <Box>
        <Typography style={{textAlign: 'center'}} gutterBottom>Need an account? </Typography>
        <Button
          style={{ width: '100%' }}
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
 