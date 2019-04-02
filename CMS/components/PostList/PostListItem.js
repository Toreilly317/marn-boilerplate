import styled from 'styled-components';
import PostInteractions from './PostInteractions';
import PostCategories from './PostCategories';

const ListItem = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  background: black;
  margin-bottom: .5rem;
  padding: 5px;
  }

  .post-date {
    text-align: center;
    padding: 0 1rem;
    background: black;
    font-size: 1.5rem;
    margin: auto 0;
  }



  .post-details {
    flex: 1;
    margin: 5px;
    color: white;
    border-radius: 2px;
    padding: .5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;
    
  }
`;

const FormatedDate = ({ date }) => (
  <div className="post-date">
    <div>
      {date.getMonth() + 1}-{date.getDay() + 1}
    </div>
    <hr />
    <div>{date.getFullYear()}</div>
  </div>
);

export default ({ post }) => (
  <ListItem>
    <input type="checkbox" />
    {/* <FormatedDate date={post.createdAt} /> */}

    <div className="post-details">
      <div>{post.title}</div>
      <div>{post.author.fullName}</div>
      <PostCategories categories={post.meta.categories} />
      <div>Tags: {post.meta.tags}</div>
    </div>
    <PostInteractions />
  </ListItem>
);
