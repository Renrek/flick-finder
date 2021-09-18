import React from 'react';

import { Paper, Typography, Divider } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Paper className="container" style={{textAlign: "center"}}>
      <Typography variant="h6">Technologies used to develop this application</Typography>
      <div>
        <img style={{width: 250, margin: 20}} src="./img/express.png"/>
        <Divider />      
        <img style={{width: 250, margin: 20}} src="./img/react-logo.jpg"/>
        <Divider />
        <img style={{width: 250, margin: 20}} src="./img/redux-saga.png"/>
        <Divider />
        <img style={{height: 100, margin: 20}} src="./img/materialui.png"/>
        <Divider />
        <img style={{width: 250, margin: 20}} src="./img/tensorflow.png"/>
      </div>
    </Paper>
  );
}

export default AboutPage;
