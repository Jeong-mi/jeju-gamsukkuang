import styled from "styled-components";

const InputBox = styled.div`
  position: relative;

  input {
    font-size: 14px;
  }

  span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export { InputBox };
