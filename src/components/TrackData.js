import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useContextState } from '../state';
import { getAuthHeaderConfig, getTrackKey } from '../utils';

const TrackData = ({
  match: {
    params: { trackId }
  }
}) => {
  const [{ trackData, loading, error }, dispatch] = useContextState();

  useEffect(() => {
    const fetchTrackData = async () => {
      const config = getAuthHeaderConfig();
      try {
        dispatch({ type: 'getTrackDataStart' });
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
          type: 'getTrackDataError',
          error: error
        });
      }
    };
    fetchTrackData();
  }, [trackId, dispatch]);

  if (!localStorage.getItem('authToken')) {
    return <Redirect to="/authorize" />;
  }

  const audioFeatures = (
    <div>
      <div>The key of the track: {getTrackKey(trackData.key)}</div>
      <div>The mode of the track: {trackData.mode === 1 ? 'major' : 'minor'}</div>
    </div>
  );

  return (
    <Fragment>
      <h1>Audio features</h1>
      {loading ? <div>Loading...</div> : audioFeatures}
      <div>{error}</div>
    </Fragment>
  );
};

export default TrackData;
