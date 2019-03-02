import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  background: ${props => props.theme.colors.primary};
`

export default () => (
  <Header>
    <h1>Header</h1>
  </Header>
)
