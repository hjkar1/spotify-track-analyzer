import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import { getAuthHeaderConfig } from '../utils';

const TrackSearch = ({ location }) => {
  const [search, setSearch] = useState('');
  const [trackList, setTrackList] = useState([]);

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
      const searchResult = await axios.get(
        `https://api.spotify.com/v1/search?q=${search}&type=track`,
        config
      );
      setTrackList(searchResult.data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1>Search tracks</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={search} />
        <button>Search</button>
      </form>
      <div>
        {trackList.map(track => (
          <Link key={track.id} to={'/track'}>
            {track.name}
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default TrackSearch;
