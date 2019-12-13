import React from 'react';
import { LinkButton, Container } from './UIComponents';

const Login = () => {
  return (
    <Container>
      <div style={{ margin: '1rem' }}>Login with your Spotify account</div>
      <LinkButton href="https://accounts.spotify.com/authorize?client_id=80e53ec7106c4712acd07cf1ffeca573&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123">
        Login
      </LinkButton>
    </Container>
  );
};

export default Login;
