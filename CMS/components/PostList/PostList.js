import React from 'react'
import PostListitem from './PostListItem'

export default ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostListitem post={post} />
    ))}
  </div>
)
