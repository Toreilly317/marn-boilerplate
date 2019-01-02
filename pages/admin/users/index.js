import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from "../../../lib/withData"

const Post = ({ user }) => (
  <div>
    <div>{user.firstName}</div>
    <div>{user.lastName}</div>
    <div>{user.email}</div>
  </div>
);

const PostList = ({ data }) => {
  const { error, userMany } = data;
  if (error) {
    return <div>Error loading posts.</div>;
  }
  if (userMany && userMany.length) {
    return (
      <section>
        <ul>{userMany.map(user => <Post key={user._id} user={user} />)}</ul>
      </section>
    );
  }
  return <div>Loading</div>;
};

export const allPosts = gql`
  query {
    userMany {
  	_id
  	firstName
  	lastName
  	email
}
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
const Component = graphql(allPosts)(PostList);

export default withData(Component)