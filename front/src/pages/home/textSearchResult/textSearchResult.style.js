import styled from "styled-components";

const TextSearchResultBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: auto;
  max-height: 250px;
  margin: 20px auto 0;
  margin-right: auto;
  margin-left: auto;
  overflow-y: scroll;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.gray01};
  border-radius: 10px;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 300px;
  }

  span {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray03};
  }

  ul {
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 0;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.black};
    }

    & :hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export { TextSearchResultBox };
