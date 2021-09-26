/**** SYSTEM ****/
import React from 'react';
import { useHistory } from 'react-router-dom';

/**** COMPONENTS ****/
import RegisterForm from '../RegisterForm/RegisterForm';

/**** MATERIAL UI ****/
import { Button } from '@material-ui/core';
function LandingPage() {

  /**** HOOKS ****/
  const history = useHistory();

  /**** STATE ****/
  const [heading, setHeading] = React.useState('Welcome');
  
  // Switch to login
  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>
      <RegisterForm />
          <center>
            <h4>Already a Member?</h4>
            <Button
              style={{ width: '100%' }}
              variant="contained"
              color="primary"
              onClick={onLogin}
            >
              Login
            </Button>
          </center>
        </div>
     
  );
}

export default LandingPage;
