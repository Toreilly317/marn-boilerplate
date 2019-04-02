import React from 'react';
import styled from 'styled-components';

const PostItemSocialData = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: black;
  align-self: flex-end;
  display: block;

  & div {
    padding: 0 1rem;
  }
`;

export default ({ meta }) => (
  <PostItemSocialData>
    <div>👁️‍🗨️: {meta.views}</div>
    <div>🗭: {comments}</div>
    <div>♻️: {Math.floor(Math.random() * 50)}</div>
  </PostItemSocialData>
);
