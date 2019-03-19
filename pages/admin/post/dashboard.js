import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ListGroup, ListGroupItem } from 'reactstrap';
import HelloWorld from 'CMS/Hello';
import AdminLayout from 'CMS/Layout/Layout';
import PostList from 'CMS/components/PostList/PostList';

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
    <div>
      <HelloWorld />
      <div>Posts</div>
      <Link href="/admin/post/create">
        <a>+ Add New</a>
      </Link>
    </div>
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
