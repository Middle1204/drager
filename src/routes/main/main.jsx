import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const Main = () => {
  const navigate = useNavigate();

  // 배경에 돌아다니는 원 갯수
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const generateCircles = () => {
      //원 생성 로직
      const newCircles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 30 + Math.random() * 50,
        duration: 5 + Math.random() * 10,
      }));
      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  const handleClick = () => {
    navigate('/play');
  };

  return (
    <S.Container>
      {circles.map((circle) => (
        <S.Circle
          key={circle.id}
          top={circle.top}
          left={circle.left}
          size={circle.size}
          duration={circle.duration}
        />
      ))}
      <S.PlayButton onClick={handleClick}>Play</S.PlayButton>
    </S.Container>
  );
};

export default Main;
