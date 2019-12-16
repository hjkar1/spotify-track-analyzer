import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getTrackDuration, getTrackKey } from '../utils';
import BarChart from './BarChart';

const LinkButton = styled(Link)`
  background-color: green;
  border-radius: 4px;
  color: white;
  margin: 1rem;
  padding: 0.5rem;
  text-decoration: none;
`;

const AudioFeatures = ({ trackData }) => {
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

export default AudioFeatures;
