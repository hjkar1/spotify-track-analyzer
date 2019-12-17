import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { useContextState } from '../state/state';
import { getTrackSearch, loadMoreTracks } from '../state/actions';
import Container from './ui/Container';
import Button from './ui/Button';
import TrackList from './TrackList';

const TrackSearch = ({ location }) => {
  const [search, setSearch] = useState('');
  const [
    { tracks, nextPageUrl, loading, error, redirect },
    dispatch
  ] = useContextState();

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem('authToken', hash.access_token);
    }
  }, [hash]);

  if ((!localStorage.getItem('authToken') && !hash.access_token) || redirect) {
    return <Redirect to="/authorize" />;
  }

  const handleChange = ({ target: { value } }) => setSearch(value);

  const handleSubmit = event => {
    event.preventDefault();
    getTrackSearch(search, dispatch);
  };

  const handleLoadMore = () => {
    loadMoreTracks(nextPageUrl, dispatch);
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '1.5rem' }}>Search tracks</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Track name"
          value={search}
          style={{ padding: '0.5rem' }}
        />
        <Button>Search</Button>
      </form>
      {loading ? (
        <div style={{ margin: '1rem' }}>Loading...</div>
      ) : error ? (
        <div style={{ margin: '1rem' }}>{error}</div>
      ) : (
        <TrackList
          tracks={tracks}
          handleLoadMore={handleLoadMore}
          nextPageUrl={nextPageUrl}
        />
      )}
    </Container>
  );
};

export default TrackSearch;
