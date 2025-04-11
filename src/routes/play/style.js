import styled, { keyframes } from 'styled-components';

const explode = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

export const Container = styled.div`
  position: relative;
  height: 100vh;
  background-color: #121212;
  overflow: hidden;
`;

export const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #2c2c2c;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #444;
  }
`;

export const ScoreWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  text-align: center;
  z-index: 5;
`;

export const Score = styled.div`
  font-size: 3rem;
  color: white;
`;

export const SubNumber = styled.div`
  font-size: 1.2rem;
  color: #aaa;
  margin-top: 0.5rem;
`;


export const Circle = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: default;
  z-index: 3;
  transition: transform 0.2s;
`;

export const Effect = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: ${explode} 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 2;
`;

export const CircleText = styled.span`
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  pointer-events: none;
`;
