import React, { useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login actions here
    // After successful login, set loggedIn to true
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2'  textAlign='center' color="black">
          Log in
        </Header>
        <Form size='big' style={{ width: '100%' }}>
  
    <Form.Input
      fluid
      icon='user'
      iconPosition='left'
      placeholder='E-mail address'
      style={{ width: '100%', height: '60px', borderRadius: '10px' }}
      
    />
    <Form.Input
      fluid
      icon='lock'
      iconPosition='left'
      placeholder='Password'
      type='password'
      style={{ width: '100%', height: '60px', borderRadius: '10px', marginTop: '10px' }}
    />
   <Button
  fluid
  size='large'
  onClick={handleLogin}
  style={{
    width: '100%',
    height: '60px',
    borderRadius: '10px',
    marginTop: '10px',
    color: 'white',
    backgroundColor: '#FB9E05', // Set background color
  }}
>
  LOGIN
</Button>


</Form>

       
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
