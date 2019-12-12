import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import { useContextState } from '../state/state';
import { getTrackSearch } from '../state/actions';

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

  const handleSubmit = event => {
    event.preventDefault();
    getTrackSearch(search, dispatch);
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
