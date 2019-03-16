import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';

const Container = styled.div`
  display: grid;
`;

const HeaderContainer = styled.header`
  background: red;
  color: white;
`;

export default () => (
  <Layout>
    <h1>This is the content Area</h1>
  </Layout>
);
