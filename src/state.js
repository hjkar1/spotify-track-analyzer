import React, { createContext, useContext, useReducer } from 'react';

const initialState = { tracks: [], trackData: {}, loading: false, error: '' };

const appReducer = (state, action) => {
  switch (action.type) {
    case 'getTracksStart':
      return {
        ...state,
        loading: true,
        error: ''
      };
    case 'getTracksSuccess':
      return {
        ...state,
        tracks: action.tracks,
        loading: false,
        error: ''
      };
    case 'getTracksFail':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case 'getTrackDataStart':
      return {
        ...state,
        loading: true,
        error: ''
      };
    case 'getTrackDataSuccess':
      return {
        ...state,
        trackData: action.trackData,
        loading: false,
        error: ''
      };
    case 'getTrackDataFail':
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

const AppContext = createContext();

export const ContextProvider = ({
  reducer = appReducer,
  state = initialState,
  children
}) => (
  <AppContext.Provider value={useReducer(reducer, state)}>
    {children}
  </AppContext.Provider>
);

export const useContextState = () => useContext(AppContext);
