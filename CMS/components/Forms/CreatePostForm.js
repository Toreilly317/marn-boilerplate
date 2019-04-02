import { useState } from 'react';
import {
 Form, FormGroup, Input, TextArea, TagInput 
} from '../common';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  return (
    <Form>
      <FormGroup>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="string"
          placeholder="Enter Title Here"
        />
      </FormGroup>
      <FormGroup>
        <div>Tags: </div>
        <TagInput onChange={t => setTags(t)} />
      </FormGroup>
      <FormGroup>
        <TextArea cols="30" rows="30" />
      </FormGroup>
      <FormGroup>
        <Input type="string" />
        <button type="submit">Save</button>
      </FormGroup>
    </Form>
  );
};

export default CreatePostForm;
