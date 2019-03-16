import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import gql from 'graphql-tag'
import styled from 'styled-components'


const PostListItem = styled.div``

export default ({ post }) => (
  <PostListItem>
    <ListGroup>
      {posts.map(post => {
        return (
          <ListGroupItem key={post.id} id={post.id}>{post.title}</ListGroupItem>
        )
      })}
      
      
    </ListGroup>
  </PostListItem>
)


import React, { useState } from 'react'
import { Mutation, withApollo } from 'react-apollo'



const All_POSTS = gql`
  mutation allPosts($limit: number!) {
    allPosts(limit: $limit) {
      title
      body
      author{
        firstname
        lastName
      }
    }
  }
`

// TODO: Find a better name for component.
const SignInForm = ({ client }) => {
  const [state, setState] = useState({ email: '', password: '' })

  const handleOnChange = e => setState({
    ...state,
    [e.target.name]: e.target.value,
  })

  return (
    <Mutation
      mutation={All_POSTS}
      onCompleted={data => {
        
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error)
      }}
    >
      {(allPosts, { data, error }) => (
        <Container>
          <Form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              allPosts({
                variables: {
                  limit: 5,
                },
              })

              setState({ email: '', password: '' })
            }}
          >
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              {error && <FormText>No user found with that information.</FormText>}
              <Input
                onChange={e => handleOnChange(e)}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={e => handleOnChange(e)}
                type="password"
                name="password"
                id="password"
                placeholder="password placeholder"
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
      )}
    </Mutation>
  )
}

export default withApollo(SignInForm)
