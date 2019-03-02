import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.theme.colors.primary.light};
  text-align: center;
  padding: ${props => props.theme.sizes.md};
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.typography.lg};
  width: 100%;
  border-radius: 5px;
`

export default Button
