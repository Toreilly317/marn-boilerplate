import { useState } from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import styled from 'styled-components';

import { Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import AdminLayout from '../../../CMS/Layout/Layout';

const Form = styled.div`
  display: flex;
  font-size: 2rem;
  padding: ${props => props.theme.sizes.sm};
  background: ${props => props.theme.colors.black};
`;

const StatusRadioButtons = styled.div``;

const CreatePostPage = () => {
  const [state, setState] = useState({});
  return (
    <AdminLayout>
      <Form action="">
        <div>
          <input type="text" placeholder="title" value={state.title} />
          <textarea name="body" value={state.body} placeholder="body" />
        </div>
        <StatusRadioButtons>
          <div>
            <input type="radio" name="status" value="draft" />
            Draft
          </div>
          <div>
            <input type="radio" name="status" value="published" />
            Published
          </div>
          <div>
            <input type="radio" name="status" value="removed" />
            Removed
          </div>
        </StatusRadioButtons>
      </Form>
    </AdminLayout>
  );
};

export default CreatePostPage;
