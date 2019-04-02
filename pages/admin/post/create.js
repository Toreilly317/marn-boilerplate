import gql from 'graphql-tag';
import CreatePostForm from 'CMS/components/Forms/CreatePostForm';
import AdminLayout from 'CMS/Layout/Layout';
import { useState } from 'react';
import { PageTitle } from 'CMS/components/common';

import { Mutation, withApollo } from 'react-apollo';

const CreatePostPage = () => {
  const [state, setState] = useState({});

  const handleFileChange = () => {};

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <AdminLayout>
      <div>
        <PageTitle>Create Post</PageTitle>
      </div>
      <CreatePostForm onsubmit={e => handleSubmit(e)} />
    </AdminLayout>
  );
};

export default CreatePostPage;
