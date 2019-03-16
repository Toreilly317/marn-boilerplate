import React from 'react';
import faker from 'faker';
import AdminLayout from '../../../CMS/Layout/Layout';
import PostList from '../../../CMS/components/PostList/PostList';

const createPosts = () => {
  const res = [];

  const fakePost = i => ({
    id: i + 1,
    author: faker.name.findName(),
    title: faker.lorem.words(),
    date: faker.date.recent(),
  });

  for (let i = 0; i < 20; i++) {
    res.push(fakePost(i));
  }

  console.log(res);
  return res;
};

const PostDashboard = props => (
  <AdminLayout>
    <h1>Post Dashboard</h1>
    <PostList posts={createPosts()} />
    <style jsx>
      {`
        h1 {
          color: purple;
        }
      `}
    </style>
  </AdminLayout>
);

export default PostDashboard;
