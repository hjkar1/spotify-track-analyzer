import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useContextState } from '../state/state';
import { getTrackData } from '../state/actions';
import { getTrackKey } from '../utils';
import BarChart from './BarChart';
import Container from './Container';

const LinkButton = styled(Link)`
  background-color: green;
  border-radius: 4px;
  color: white;
  margin: 1rem;
  padding: 0.5rem;
  text-decoration: none;
`;

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

  const getTrackDuration = durationInMilliseconds => {
    const durationInSeconds = durationInMilliseconds / 1000;
    const minutes = Math.round(durationInSeconds / 60);
    let seconds = Math.round(durationInSeconds % 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return `${minutes}:${seconds}`;
  };

  const getAudioFeatures = () => {
    const chartData = [
      { y: 'acousticness', x: trackData.acousticness },
      { y: 'danceability', x: trackData.danceability },
      { y: 'energy', x: trackData.energy },
      { y: 'instrumentalness', x: trackData.instrumentalness },
      { y: 'liveness', x: trackData.liveness },
      { y: 'speechiness', x: trackData.speechiness },
      { y: 'valence', x: trackData.valence }
    ];

    return (
      <Fragment>
        <div style={{ fontWeight: 'bold', margin: '1rem' }}>
          Estimated audio features:
        </div>
        <div style={{ margin: '1rem' }}>
          Duration: {getTrackDuration(trackData.duration_ms)}
        </div>
        <div style={{ margin: '1rem' }}>Key: {getTrackKey(trackData.key)}</div>
        <div style={{ margin: '1rem' }}>
          Mode:
          {trackData.mode === 1
            ? ' major'
            : trackData.mode === 0
            ? ' minor'
            : ' Unknown'}
        </div>
        <div style={{ margin: '1rem' }}>
          Beats per minute: {Math.round(trackData.tempo)}
        </div>
        <div style={{ margin: '1.5rem' }}>
          <BarChart data={chartData} />
        </div>
        <LinkButton to="/">Back to search</LinkButton>
      </Fragment>
    );
  };

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
        getAudioFeatures()
      ) : null}
    </Container>
  );
};

export default TrackData;
