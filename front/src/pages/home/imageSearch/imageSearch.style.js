import styled from "styled-components";

const ImageUploadBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 48px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: 0.8s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};
  }

  input {
    display: none;
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 300px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    cursor: pointer;

    svg {
      margin-right: 5px;
    }
  }

  ul {
    opacity: 0;
    text-align: center;
  }

  * {
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray03};
  }

  &:hover {
    ul {
      opacity: 1;
    }
  }
`;

export { ImageUploadBox, InfoBox };
