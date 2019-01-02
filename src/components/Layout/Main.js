
import Sidebar from "./Sidebar"
import styled from "styled-components"

const Wrapper = styled.div`
  background: black;
  min-height: 100vh;
  display: flex;
`


export default () => {
  <Wrapper>
    <Sidebar />
    <Content>
      {[props.children]}
    </Content>
  </Wrapper>
}