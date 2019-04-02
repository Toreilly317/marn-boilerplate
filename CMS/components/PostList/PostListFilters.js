import styled from "styled-components";
import DatePicker from "./DatePicker";

const PostFilterStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  input {
    border: none;
    outline: none;
    padding: 10px;
  }
`;

const PostListfilters = () => {
  return (
    <PostFilterStyles>
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "black",
            padding: "5px",
            borderRadius: "5px 5px"
          }}
        >
          🔎
        </div>
        <input type="text" />
      </div>

      <DatePicker />
    </PostFilterStyles>
  );
};

export default PostListfilters;
