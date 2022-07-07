import styled, { css } from "styled-components";

const ReviewFormContainer = styled.form`
  width: 100%;
`;

const InputForm = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1% 1%;
  margin: 1% 0;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 10px;
  outline-color: ${({ theme }) => theme.colors.secondary};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 50px;

  section {
    margin-right: auto;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    justify-content: flex-end;
  }
`;

const StarContainer = styled.div`
  text-align: center;
  border: none;

  ${(props) => {
    return css`
      padding: ${props.padding};
    `;
  }}
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5% 1% 0 0;
`;

const CardText = styled.p`
  ${(props) => {
    const selected = props.theme.colors[props.color];
    return css`
      color: ${selected};
    `;
  }}
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-left: 1%;
`;

export {
  ReviewFormContainer,
  InputForm,
  Footer,
  StarContainer,
  CardHeader,
  CardText,
};
