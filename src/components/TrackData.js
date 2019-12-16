import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useContextState } from '../state/state';
import { getTrackData } from '../state/actions';
import Container from './Container';
import AudioFeatures from './AudioFeatures';

const TrackData = ({
  match: {
    params: { trackId }
  }
}) => {
  const [
    { trackData, tracks, loading, error, redirect },
    dispatch
  ] = useContextState();

  useEffect(() => {
    getTrackData(trackId, dispatch);
  }, [trackId, dispatch]);

  if (!localStorage.getItem('authToken') || redirect) {
    return <Redirect to="/authorize" />;
  }

  const track = tracks.find(track => track.id === trackId);

  return (
    <Container>
      <h1 style={{ margin: '1rem' }}>{track.name}</h1>
      <div style={{ margin: '1rem' }}>
        {track.artists.map(artist => artist.name).join(', ')}
      </div>
      {loading ? (
        <div style={{ margin: '1rem' }}>Loading...</div>
      ) : error ? (
        <div style={{ margin: '1rem' }}>{error}</div>
      ) : trackData ? (
        <AudioFeatures trackData={trackData} />
      ) : null}
    </Container>
  );
};

export default TrackData;
