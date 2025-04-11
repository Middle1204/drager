import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';

const Play = () => {
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [effects, setEffects] = useState([]);
  const [randomNumber, setRandomNumber] = useState('00');
  const [selectedCircles, setSelectedCircles] = useState([]);

  
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
      const newNumber = Math.floor(Math.random() * 20 + 1); // 1~20
      setRandomNumber(newNumber.toString());
    }, 1000);    
    return () => clearInterval(interval);
  }, []);

  const handleHit = (circle) => {
    if (!isMouseDown) return;
    if (selectedCircles.some((c) => c.id === circle.id)) return;
  
    const newSelection = [...selectedCircles, circle];
    const total = newSelection.reduce((sum, c) => sum + c.num, 0);
  
    if (total === parseInt(randomNumber)) {
      setCircles((prev) => prev.filter((c) => !newSelection.some((s) => s.id === c.id)));
      setScore((prev) => prev + newSelection.length);
      setSelectedCircles([]);
      newSelection.forEach((c) => {
        setEffects((prev) => [...prev, { id: Math.random(), x: c.x, y: c.y }]);
      });
    } else if (total > parseInt(randomNumber)) {
      setSelectedCircles([]); // 실패 시 선택 초기화
    } else {
      setSelectedCircles(newSelection); // 조건 아직 만족 안되면 선택 유지
    }
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
