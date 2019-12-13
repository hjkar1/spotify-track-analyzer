const reducer = (state, action) => {
  switch (action.type) {
    case 'getTracksStart':
      return {
        ...state,
        loading: true,
        error: '',
        redirect: false
      };
    case 'getTracksSuccess':
      return {
        ...state,
        tracks: action.tracks,
        loading: false,
        error: '',
        redirect: false
      };
    case 'getTracksFail':
      return {
        ...state,
        error: action.error,
        loading: false,
        redirect: false
      };
    case 'getTrackDataStart':
      return {
        ...state,
        loading: true,
        error: '',
        redirect: false
      };
    case 'getTrackDataSuccess':
      return {
        ...state,
        trackData: action.trackData,
        loading: false,
        error: '',
        redirect: false
      };
    case 'getTrackDataFail':
      return {
        ...state,
        error: action.error,
        loading: false,
        redirect: false
      };
    case 'redirectToAuth':
      return {
        ...state,
        redirect: true
      };
    default:
      return state;
  }
};

export default reducer;
