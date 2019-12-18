import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

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

const TrackList = ({ tracks, nextPageUrl, handleLoadMore }) => (
  <LinkContainer>
    {tracks.map(track => (
      <StyledLink key={track.id} to={`/track/${track.id}`}>
        {track.artists.map(artist => artist.name).join(', ')}: {track.name}
      </StyledLink>
    ))}
    {nextPageUrl && (
      <Button onClick={handleLoadMore} style={{ marginTop: '1rem' }}>
        Load more
      </Button>
    )}
  </LinkContainer>
);

export default TrackList;
