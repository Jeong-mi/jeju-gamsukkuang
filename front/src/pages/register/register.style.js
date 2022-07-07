import styled from "styled-components";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100vh - 70px);
  letter-spacing: 0.5px;

  img {
    width: 40px;
  }
`;

const Title = styled.h2`
  margin: 40px 0 20px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  span {
    margin: 20px 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray03};
    cursor: pointer;
  }
`;

const RegisterButton = styled.button`
  width: 400px;
  height: 48px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "#fff" : "#ff881d")};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${(props) => (props.isActive ? "#ff881d" : "#fff")};
  cursor: pointer;

  @media screen and ${({ theme }) => theme.breakPoint} {
    width: 342px;
  }
`;

const InputBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 105px;

  label {
    margin: 7px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 12px;
  }

  p {
    margin: 7px 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};

    @media screen and ${({ theme }) => theme.breakPoint} {
      font-size: 10px;
    }
  }
`;

export { RegisterContainer, Title, RegisterForm, InputBox, RegisterButton };
