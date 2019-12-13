import axios from 'axios';
import { getAuthHeaderConfig } from '../utils';

export const getTrackSearch = async (search, dispatch) => {
  const config = getAuthHeaderConfig();
  dispatch({ type: 'getTracksStart' });

  try {
    const searchResult = await axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=track`,
      config
    );
    const trackList = searchResult.data.tracks.items;
    dispatch({
      type: 'getTracksSuccess',
      tracks: trackList
    });
  } catch (error) {
    dispatch({
      type: 'getTracksFail',
      error: 'Something went wrong.'
    });
  }
};

export const getTrackData = async (trackId, dispatch) => {
  const config = getAuthHeaderConfig();
  dispatch({ type: 'getTrackDataStart' });

  try {
    const result = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      config
    );
    dispatch({
      type: 'getTrackDataSuccess',
      trackData: result.data
    });
  } catch (error) {
    dispatch({
      type: 'getTrackDataFail',
      error: 'Audio features not found.'
    });
  }
};
