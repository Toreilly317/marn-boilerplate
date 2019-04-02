import { useState } from 'react';

const Tag = ({ tag }) => <div>{tag}</div>;

const TagInput = ({ onChange }) => {
  const [tags, setTags] = useState([]);

  const handleOnChange = e => {
    const newTags = e.target.value.split(',').map(tag => tag.trim());
    setTags(newTags);
    onChange(tags);
  };

  return (
    <div>
      <div>
        {tags.map((tag, i) => (
          <Tag key={i} tag={tag} />
        ))}
      </div>
      <input
        placeholder="Tags"
        type="text"
        value={tags}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TagInput;
