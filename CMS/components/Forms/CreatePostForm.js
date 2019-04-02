import { useState } from 'react';
import {
 Form, FormGroup, Input, TagInput 
} from '../common';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  return (
    <Form>
      <FormGroup>
        <div>Title: </div>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="string"
        />
      </FormGroup>
      <FormGroup>
        <div>Tags: </div>
        <TagInput onChange={t => setTags(t)} />
      </FormGroup>
      <FormGroup>
        <textarea />
      </FormGroup>
      <FormGroup>
        <Input type="string" />
        <button type="submit">Save</button>
      </FormGroup>
    </Form>
  );
};

export default CreatePostForm;
