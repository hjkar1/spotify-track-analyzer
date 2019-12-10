import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { ContextProvider } from './state';
import TrackSearch from './components/TrackSearch';
import TrackData from './components/TrackData';
import Login from './components/Login';

function App() {
  return (
    <ContextProvider>
      <Switch>
        <Route exact path="/" component={TrackSearch} />
        <Route exact path="/track/:trackId" component={TrackData} />
        <Route exact path="/authorize" component={Login} />
      </Switch>
    </ContextProvider>
  );
}

export default App;
