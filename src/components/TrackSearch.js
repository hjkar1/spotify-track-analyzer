import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useContextState } from '../state/state';
import { getTrackSearch } from '../state/actions';
import { Container } from './UIComponents';

const SubmitButton = styled.button`
  background-color: green;
  border: none;
  border-radius: 4px;
  color: white;
  margin-left: 1rem;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

const StyledLink = styled(Link)`
  color: black;
  margin: 0.5rem;
  text-decoration: none;
`;

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
        <SubmitButton>Search</SubmitButton>
      </form>
      {loading ? (
        <div style={{ margin: '1rem' }}>Loading...</div>
      ) : (
        <LinkContainer>
          {tracks.map(track => (
            <StyledLink key={track.id} to={`/track/${track.id}`}>
              {track.name}
            </StyledLink>
          ))}
        </LinkContainer>
      )}
      <div style={{ margin: '1rem' }}>{error}</div>
    </Container>
  );
};

export default TrackSearch;
