import { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import cookie from 'cookie';
import gql from 'graphql-tag';
import styled from 'styled-components';
import redirect from '../../lib/redirect';

const FullPageHero = styled.div`
  height: 100vh;
  width: 100vw;
  background: #313131;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 10rem;
`;

const Wrapper = styled.div`
  background: black;
  h1 {
    text-align: center;
    padding: 1rem;
    font-size: 3rem;
    border-bottom: 3px solid #212121;
  }
  p {
    padding: 1rem;
    text-align: right;
  }
`;

const Form = styled.form`
  padding: 1rem;
  input,
  textarea {
    display: block;
    flex-grow: 1;
    padding: 1rem 1rem 1rem 0;
  }
  button {
    background: #121212;
    padding: 1rem;
    display: block;
    width: 100%;
    border: none;
    color: white;
    font-size: 1.8rem;
  }

  button:disabled {
    color: #313131;
  }
`;

const FormGroup = styled.div`
  display: flex;

  align-items: center;
  font-size: 1.5rem;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  input {
    width: 300px;
    margin-left: 15px;
  }

  label {
    width: 100px;
  }
`;

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const SignInForm = ({ client }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChange = e => setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        document.cookie = cookie.serialize('token', data.signIn.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        // Force a reload of all the current queries now that the user is
        // logged in
        client.cache.reset().then(() => {
          redirect({}, '/admin/dashboard');
        });
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error);
      }}
    >
      {(signIn, { data, error }) => (
        <FullPageHero>
          <Wrapper>
            <h1>Log In</h1>
            <Form
              onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();

                signIn({
                  variables: {
                    email,
                    password,
                  },
                });

                setEmail('');
                setPassword('');
              }}
            >
              <FormGroup>
                <label htmlFor="exampleEmail">Email</label>
                {error && (
                  <FormText>No user found with that information.</FormText>
                )}
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="exampleEmail"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                />
              </FormGroup>
              <button disabled={email == '' || password == ''}>Login</button>
            </Form>
            <p>Already have an account? Sign In here</p>
          </Wrapper>
        </FullPageHero>
      )}
    </Mutation>
  );
};

export default withApollo(SignInForm);
