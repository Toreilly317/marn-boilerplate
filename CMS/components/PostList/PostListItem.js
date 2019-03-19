import { useState } from 'react';
import styled from 'styled-components';
import Button from 'CMS/components/common/Button';

const PostListItem = styled.tr``;

const CheckBox = styled.input``;

export default ({ post }) => {
  const [state, setState] = useState();
  return (
    <PostListItem>
      <td>
        <CheckBox type="checkbox" value={post.id} />
      </td>
      <td>{post.title}</td>
      <td>{post.author.fullName}</td>
      <td>{post.updatedAt}</td>
      <td>{post.status}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button>X</button>
      </td>
    </PostListItem>
  );
};
