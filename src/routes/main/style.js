import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0.2;
  }
  50% {
    transform: translate(20px, -20px);
    opacity: 0.4;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.2;
  }
`;

export const Container = styled.div`
  position: relative;
  height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const PlayButton = styled.button`
  position: relative;
  z-index: 10;
  background-color: #1f1f1f;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #2c2c2c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Circle = styled.div`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: ${float} ${({ duration }) => duration}s ease-in-out infinite;
  z-index: 1;
`;
