import styled from "styled-components"


const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
  background: ${props => props.theme.colors.black};
  padding: ${props => props.}
`

export default ({ children }) => {
  return (
    <Button>{children}</Button>
  )
  
}