import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useContextState } from '../state';
import { getAuthHeaderConfig, getTrackKey } from '../utils';
import BarChart from './BarChart';

const TrackData = ({
  match: {
    params: { trackId }
  }
}) => {
  const [{ trackData, tracks, loading, error }, dispatch] = useContextState();

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
          type: 'getTrackDataFail',
          error: 'Audio features not found.'
        });
      }
    };
    fetchTrackData();
  }, [trackId, dispatch]);

  if (!localStorage.getItem('authToken')) {
    return <Redirect to="/authorize" />;
  }

  const getTrackDuration = durationInMilliseconds => {
    const durationInSeconds = durationInMilliseconds / 1000;
    const minutes = Math.round(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);
    return `${minutes}:${seconds}`;
  };

  const getAudioFeatures = () => {
    const chartData = [
      { x: 'acousticness', y: trackData.acousticness },
      { x: 'danceability', y: trackData.danceability },
      { x: 'energy', y: trackData.energy },
      { x: 'instrumentalness', y: trackData.instrumentalness },
      { x: 'liveness', y: trackData.liveness },
      { x: 'speechiness', y: trackData.speechiness },
      { x: 'valence', y: trackData.valence }
    ];

    return (
      <div>
        <div>Estimated audio features:</div>
        <div>Duration: {getTrackDuration(trackData.duration_ms)}</div>
        <div>Key: {getTrackKey(trackData.key)}</div>
        <div>
          Mode:
          {trackData.mode === 1
            ? 'major'
            : trackData.mode === 0
            ? 'minor'
            : 'Unknown'}
        </div>
        <div>Beats per minute: {Math.round(trackData.tempo)}</div>
        <BarChart data={chartData} />
        <Link to="/">Back to search</Link>
      </div>
    );
  };

  const track = tracks.find(track => track.id === trackId);

  return (
    <Fragment>
      <h1>{track.name}</h1>
      <div>Artists: {track.artists.map(artist => artist.name).join(', ')}</div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        error
      ) : trackData ? (
        getAudioFeatures()
      ) : null}
    </Fragment>
  );
};

export default TrackData;
