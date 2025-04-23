import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #121212;
  overflow: hidden;
  position: relative;
`;

export const ExitButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
  padding: 5px 10px;
  background: #555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ScoreWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Score = styled.h1`
  color: #fff;
  font-size: 48px;
  margin: 0;
`;

export const SubNumber = styled.p`
  color: #ccc;
  font-size: 24px;
  margin-top: 10px;
`;

export const Circle = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  pointer-events: auto;
`;

export const CircleText = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
  pointer-events: none;
`;

const puff = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
`;

export const Effect = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  opacity: 0.4;
  animation: ${puff} 0.5s forwards;
  pointer-events: none;
`;

export const TrailDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.6;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  pointer-events: none;
`;


export const SpawnAreaBox = styled.div`

`;


export const TrailCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 20;
`;
