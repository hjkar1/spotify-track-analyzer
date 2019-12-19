import React from 'react';
import { render } from '@testing-library/react';
import TrackList from './TrackList';

test('displays the load more button if there is more tracks to load', () => {
  const { getByText } = render(
    <TrackList
      tracks={[]}
      handleLoadMore={() => {}}
      nextPageUrl={'nextPageUrl'}
    />
  );

  const showMore = getByText('Load more');
  expect(showMore).toBeDefined();
});

test('hides the load more button if there is no more tracks to load', () => {
  const { queryByText } = render(
    <TrackList tracks={[]} handleLoadMore={() => {}} nextPageUrl={null} />
  );

  const showMore = queryByText('Load more');
  expect(showMore).toBeNull();
});
