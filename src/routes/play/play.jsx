import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';

const generateRandomTarget = () => Math.floor(Math.random() * 11 + 5).toString(); 

const CIRCLE_SIZE = 80;
const SPAWN_AREA = {
  top: 50,
  left: 50,
  size: 40,
};

const Play = () => {
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [effects, setEffects] = useState([]);
  const [randomNumber, setRandomNumber] = useState(generateRandomTarget());
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [trail, setTrail] = useState([]);

  const circleId = useRef(0);
  const trailTimeoutRef = useRef(null);

  useEffect(() => {
    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => {
      setIsMouseDown(false);
      setSelectedCircles([]); 
    };
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (isMouseDown) {
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;

        setTrail((prev) => [...prev.slice(-10), {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
        }]);

        circles.forEach((circle) => {
          const dx = (xPercent - circle.x) * window.innerWidth / 100;
          const dy = (yPercent - circle.y) * window.innerHeight / 100;
          const dist = Math.sqrt(dx ** 2 + dy ** 2);
          if (dist < CIRCLE_SIZE / 2) {
            handleHit(circle);
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMouseDown, circles]);

  useEffect(() => {
    if (!isMouseDown && trail.length > 0) {
      trailTimeoutRef.current = setTimeout(() => setTrail([]), 300);
    }
    return () => clearTimeout(trailTimeoutRef.current);
  }, [isMouseDown, trail]);

  const isOverlapping = (x, y, circles) => {
    return circles.some(circle => {
      const dx = (x - circle.x) * window.innerWidth / 100;
      const dy = (y - circle.y) * window.innerHeight / 100;
      return Math.sqrt(dx ** 2 + dy ** 2) < CIRCLE_SIZE;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prev) => {
        if (prev.length >= 10) return prev;
        let attempts = 0;
        while (attempts < 20) {
          const x = SPAWN_AREA.left - SPAWN_AREA.size / 2 + Math.random() * SPAWN_AREA.size;
          const y = SPAWN_AREA.top - SPAWN_AREA.size / 2 + Math.random() * SPAWN_AREA.size;

          if (!isOverlapping(x, y, prev)) {
            const newCircle = {
              id: circleId.current++,
              x,
              y,
              num: Math.floor(Math.random() * 9) + 1,
            };
            return [...prev, newCircle];
          }
          attempts++;
        }
        return prev;
      });
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
      setRandomNumber(generateRandomTarget());
      newSelection.forEach((c) => {
        setEffects((prev) => [...prev, { id: Math.random(), x: c.x, y: c.y }]);
      });
    } else if (total > parseInt(randomNumber)) {
      setSelectedCircles([]);
    } else {
      setSelectedCircles(newSelection);
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

      <S.SpawnAreaBox
        style={{
          top: `${SPAWN_AREA.top}%`,
          left: `${SPAWN_AREA.left}%`,
          width: `${SPAWN_AREA.size}%`,
          height: `${SPAWN_AREA.size}%`,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          position: 'absolute'
        }}
      />

      {circles.map((circle) => (
        <S.Circle
          key={circle.id}
          style={{
            top: `${circle.y}%`,
            left: `${circle.x}%`,
            backgroundColor: selectedCircles.some(c => c.id === circle.id) ? 'rgba(255,255,255,0.3)' : 'white'
          }}
          onMouseEnter={() => handleHit(circle)}
        >
          {circle.num}
        </S.Circle>
      ))}

      {effects.map((effect) => (
        <S.Effect
          key={effect.id}
          style={{ top: `${effect.y}%`, left: `${effect.x}%` }}
        />
      ))}

      {trail.map((t) => (
        <S.TrailCanvas>
        <svg width="100%" height="100%">
          <polyline
            points={trail.map(p => `${p.x},${p.y}`).join(' ')}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6 }}
          />
        </svg>
      </S.TrailCanvas>
      
      ))}
    </S.Container>
  );
};

export default Play;
