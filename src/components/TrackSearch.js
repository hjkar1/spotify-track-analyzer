import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import { useContextState } from '../state';
import { getAuthHeaderConfig } from '../utils';

const TrackSearch = ({ location }) => {
  const [search, setSearch] = useState('');
  const [{ tracks, loading, error }, dispatch] = useContextState();

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem('authToken', hash.access_token);
    }
  }, [hash]);

  if (!localStorage.getItem('authToken') && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  const handleChange = ({ target: { value } }) => setSearch(value);

  const handleSubmit = async event => {
    event.preventDefault();
    const config = getAuthHeaderConfig();
    try {
      dispatch({ type: 'getTracksStart' });
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
        type: 'getTracksError',
        error: 'Something went wrong.'
      });
    }
  };

  return (
    <Fragment>
      <h1>Search tracks</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={search} />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {tracks.map(track => (
            <Link key={track.id} to={`/track/${track.id}`}>
              {track.name}
            </Link>
          ))}
        </div>
      )}
      <div>{error}</div>
    </Fragment>
  );
};

export default TrackSearch;
