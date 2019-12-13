import React, { useReducer } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { AppContext } from './state/state';
import reducer from './state/reducer';
import TrackSearch from './components/TrackSearch';
import TrackData from './components/TrackData';
import Login from './components/Login';

const initialState = { tracks: [], trackData: null, loading: false, error: '' };

const App = () => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    <Switch>
      <Route exact path="/" component={TrackSearch} />
      <Route exact path="/track/:trackId" component={TrackData} />
      <Route exact path="/authorize" component={Login} />
    </Switch>
  </AppContext.Provider>
);

export default App;
