import React from 'react';
import { render } from '@testing-library/react';
import TrackList from './TrackList';
// Router is needed to prevent errors when rendering a component that contains Link components.
import { BrowserRouter } from 'react-router-dom';

const mockTracks = [
  { id: 1, name: 'test', artists: [{ name: 'artist1' }, { name: 'artist2' }] },
  { id: 2, name: 'test', artists: [{ name: 'artist1' }, { name: 'artist2' }] },
  { id: 3, name: 'test', artists: [{ name: 'artist1' }, { name: 'artist2' }] }
];

test('renders all tracks', () => {
  const { getAllByText } = render(
    <BrowserRouter>
      <TrackList
        tracks={mockTracks}
        handleLoadMore={() => {}}
        nextPageUrl={''}
      />
    </BrowserRouter>
  );

  const tracks = getAllByText('artist1, artist2: test');
  expect(tracks).toHaveLength(3);
});

test('displays the load more button if there is more tracks to load', () => {
  const { getByText } = render(
    <TrackList
      tracks={[]}
      handleLoadMore={() => {}}
      nextPageUrl={'nextPageUrl'}
    />
  );

  const loadMoreButton = getByText('Load more');
  expect(loadMoreButton).toBeDefined();
});

test('hides the load more button if there is no more tracks to load', () => {
  const { queryByText } = render(
    <TrackList tracks={[]} handleLoadMore={() => {}} nextPageUrl={null} />
  );

  const loadMoreButton = queryByText('Load more');
  expect(loadMoreButton).toBeNull();
});
