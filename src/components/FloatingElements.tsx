import React from 'react';
import { FallingElementProps } from '../app/types';

const FloatingElements: React.FC<{ elements: FallingElementProps[] }> = ({ elements }) => {
  return (
    <>
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.startX}%`,
            top: '10%',
            transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}ms`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          <img
            src={`/images/card.png`}
            alt="Falling Card"
            className="drop-shadow-lg"
            style={{
              width: `${element.scale * 100}px`,
              height: 'auto',
            }}
          />
        </div>
      ))}
    </>
  );
};

export default FloatingElements;