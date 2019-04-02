import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TagList = styled.div`
  display: flex;
  & div {
    margin: 5px;
  }
`;

const Tag = ({ tag }) => (
  <div>
    <span>X</span>
    <span>{tag}</span>
  </div>
);

const TagInput = ({ onChange }) => {
  const [state, setState] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(state.split(',').filter(tag => tag.trim() !== '' && tag.trim()));
    onChange(tags);
  }, [state]);

  return (
    <div>
      <input
        placeholder="Tags"
        type="text"
        value={state}
        onChange={e => setState(e.target.value)}
      />
      <TagList>
        {tags.map((tag, i) => (
          <Tag key={i} tag={tag} />
        ))}
      </TagList>
    </div>
  );
};

export default TagInput;
