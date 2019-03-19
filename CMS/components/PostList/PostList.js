import React from 'react';
import styled from 'styled-components';
import PostListitem from './PostListItem';

const PostList = styled.table`
  color: white;
  padding: ${props => props.theme.sizes.sm};
  font-size: 1.5rem;
  width: 100%;
  text-align: left;
`;

export default ({ posts }) => (
  <PostList>
    <tr>
      <th>
        <input type="checkbox" />
      </th>
      <th>Title</th>
      <th>Author</th>
      <th>Last Updated</th>
      <th>Status</th>
    </tr>
    {posts.map(post => (
      <PostListitem key={post.id} post={post} />
    ))}
  </PostList>
);
