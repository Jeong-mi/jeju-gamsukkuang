import styled, { keyframes } from "styled-components";
import { darken } from "polished";

const fadeIn = keyframes`
 from {
    background: rgba(0, 0, 0, 0%);
  }

  to {
    background: rgba(0, 0, 0, 30%);
    backdrop-filter: blur(5px);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(100%);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  animation: ${fadeIn} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;

  * {
    font-weight: 600;
  }
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  animation: ${slideUp} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const ImgInputButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all 0.2s ease-in-out;
  border: none;
  font-weight: 600;

  /*크기*/
  height: 50px;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  /*색상*/
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }

  &:active {
    background: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  & > input {
    display: none;
  }
`;

const Span = styled.span`
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray03};
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

export { ModalBackground, ModalBox, Span, ImgInputButton, InfoBox };
