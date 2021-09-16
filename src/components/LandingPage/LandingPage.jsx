/**** SYSTEM ****/
import React from 'react';
import { useHistory } from 'react-router-dom';

/**** COMPONENTS ****/
import RegisterForm from '../RegisterForm/RegisterForm';

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
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
     
  );
}

export default LandingPage;
