/**** SYSTEM ****/
import React from 'react';
import { useHistory } from 'react-router-dom';

/**** COMPONENTS ****/
import RegisterForm from '../RegisterForm/RegisterForm';

/**** MATERIAL UI ****/
import { Button, Box, Typography } from '@material-ui/core';

function RegisterPage() {
  /**** HOOKS ****/
  const history = useHistory();

  return (
    <Box>
      <RegisterForm />
      <Box>
        <Typography style={{textAlign: 'center'}} gutterBottom>Already a Member? </Typography>
        <Button
          style={{ width: '100%' }}
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterPage;
