import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';

const Play = () => {
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [effects, setEffects] = useState([]);
  const [randomNumber, setRandomNumber] = useState('00');

  const circleId = useRef(0);

  // 마우스 눌림 감지
  useEffect(() => {
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (circles.length < 10) {
        const newCircle = {
          id: circleId.current++,
          x: Math.random() * 90,
          y: Math.random() * 90,
          num: Math.floor(Math.random() * 10), // 0~9
        };
        setCircles((prev) => [...prev, newCircle]);
      }
    }, 1000);
    
    {circles.map((circle) => (
      <S.Circle
        key={circle.id}
        style={{ top: `${circle.y}%`, left: `${circle.x}%` }}
        onMouseEnter={() => handleHit(circle)}
      >
        <S.CircleText>{circle.num}</S.CircleText>
      </S.Circle>
    ))}
    
    return () => clearInterval(interval);
  }, [circles]);
  
  




  // 랜덤 숫자 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = Math.floor(Math.random() * 90 + 10); // 10~99
      setRandomNumber(newNumber.toString());
    }, 1000); // 1초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  const handleHit = (circle) => {
    if (!isMouseDown) return;

    setCircles((prev) => prev.filter((c) => c.id !== circle.id));
    setScore((prev) => prev + 1);

    setEffects((prev) => [
      ...prev,
      { id: Math.random(), x: circle.x, y: circle.y },
    ]);
  };

  const handleExit = () => {
    alert('게임 종료');
    window.location.href = '/';
  };

  return (
    <S.Container>
      <S.ExitButton onClick={handleExit}>게임 종료</S.ExitButton>

      <S.ScoreWrapper>
        <S.Score>{score}</S.Score>
        <S.SubNumber>{randomNumber}</S.SubNumber>
      </S.ScoreWrapper>

      {circles.map((circle) => (
        <S.Circle
          key={circle.id}
          style={{ top: `${circle.y}%`, left: `${circle.x}%` }}
          onMouseEnter={() => handleHit(circle)}
        />
      ))}

      {effects.map((effect) => (
        <S.Effect
          key={effect.id}
          style={{ top: `${effect.y}%`, left: `${effect.x}%` }}
        />
      ))}
    </S.Container>
  );
};

export default Play;
