import styled, { keyframes } from "styled-components";

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
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 350px;
  padding: 40px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  animation: ${slideUp} 0.4s cubic-bezier(0.5, 0, 0, 0.8) forwards;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #e5e5f1;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

export { ModalBackground, ModalBox, ModalButton };
