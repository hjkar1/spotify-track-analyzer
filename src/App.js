import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import TrackSearch from './components/TrackSearch';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={TrackSearch} />
        <Route exact path="/authorize" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
