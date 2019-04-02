import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import AdminLayout from 'CMS/Layout/Layout';
import PostList from 'CMS/components/PostList/PostList';

const Row = styled.div`
  display: flex;
  align-items: center;
  h1 {
    line-height: 0;
    margin: 0;
    padding: 0;
  }
`;

const PageHeader = styled.div`
  font-size: 2rem;
  padding: 0.5rem;
`;

const GET_POSTS = gql`
  {
    allPosts(limit: 10) {
      id
      title
      status
      updatedAt
      author {
        id
        firstName
        fullName
        email
      }
    }
  }
`;

const PostDashboard = props => (
  <AdminLayout>
    <Row>
      <PageHeader>Posts</PageHeader>
      <div>
        <button type="button">Create New</button>
      </div>
    </Row>
    <Query query={GET_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <PostList posts={data.allPosts} />;
      }}
    </Query>
    <h1>This is the content Area</h1>
  </AdminLayout>
);

export default PostDashboard;
