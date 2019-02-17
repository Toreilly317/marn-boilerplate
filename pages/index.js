import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
`

const HeaderContainer = styled.header`
  background: red;
  color: white;
`

export default () => (
  <Container>
    <HeaderContainer>
      <h1>Whats up </h1>
    </HeaderContainer>
  </Container>
)
