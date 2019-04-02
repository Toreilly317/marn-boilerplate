import { useState } from 'react';
import styled from 'styled-components';
import PostListFilters from './PostListFilters';
import PostListItem from './PostListItem';

const List = styled.div`
  background: #121212;
  padding: 1rem;
`;

const SelectAll = ({ onSelect }) => (
  <div>
    <input onChange={onSelect} type="checkbox" />
    <span>Select All</span>
  </div>
);

export default ({ posts }) => {
  const [selected, setSelected] = useState([]);

  const handleOnSelect = e => {
    const targetId = e.target.value;
    // add Id if not already in state
    if (!selected.includes(targetId)) {
      setSelected([...selected, targetId]);
    }
    // remove id if included in state
    else {
      const updatedIds = selected.filter(id => id !== targetId);
      setSelected(updatedIds);
    }

    console.log('SELECTED', selected);
  };

  const handleSelectAll = () => {
    if (selected.length > 0) {
      setSelected([]);
    }
 else {
      const ids = posts.map(post => post.id);
      setSelected([...selected, ...ids]);
      console.log('SELECTED', selected);
    }
  };

  return (
    <List>
      <PostListFilters />
      <SelectAll onSelect={handleSelectAll} />
      {posts.map(post => (
        <PostListItem
          onSelect={handleOnSelect}
          isChecked={selected.includes(post.id)}
          key={post.id}
          post={post}
        />
      ))}
    </List>
  );
};
