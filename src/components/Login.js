import React, { Fragment } from 'react';

const Login = () => {
  return (
    <Fragment>
      <div>Login with your Spotify account</div>
      <a href="https://accounts.spotify.com/authorize?client_id=80e53ec7106c4712acd07cf1ffeca573&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123">
        Login
      </a>
    </Fragment>
  );
};

export default Login;
