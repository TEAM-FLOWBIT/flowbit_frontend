import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const moveAndFade = (distance: number) => keyframes`
  0% { transform: translateX(0); opacity: 1; }
  80% { transform: translateX(${distance}px); opacity: 1; }
  80.01% { transform: translateX(${distance}px); opacity: 0; }
  100% { transform: translateX(${distance}px); opacity: 0; }
`;

const Circle = styled.circle<{ distance: number; delay: number }>`
  animation: ${(props) => moveAndFade(props.distance)} 2s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export default function Loading({ size }: { size: 's' | 'm' | 'l' }) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [circleAttributes, setCircleAttributes] = useState<
    { cx: number; cy: number; r: number; fill: string; delay: number }[]
  >([]);

  useEffect(() => {
    let distance: number;

    switch (size) {
      case 'l':
        setWidth(52);
        setHeight(18);
        distance = 60;
        setCircleAttributes([
          { cx: -9, cy: 9, r: 9, fill: '#D315FF', delay: 1.33 },
          { cx: -5.5, cy: 8.5, r: 5.5, fill: '#6A4DFF', delay: 0.67 },
          { cx: -9, cy: 8.5, r: 3.5, fill: '#2D6DFF', delay: 0 },
        ]);
        break;
      case 'm':
        setWidth(32);
        setHeight(11);
        distance = 40;
        setCircleAttributes([
          { cx: -5.53846, cy: 5.5, r: 5.53846, fill: '#D315FF', delay: 1.33 },
          {
            cx: -3.38462,
            cy: 5.19461,
            r: 3.38462,
            fill: '#6A4DFF',
            delay: 0.67,
          },
          { cx: -5.53846, cy: 5.19455, r: 2.15385, fill: '#2D6DFF', delay: 0 },
        ]);
        break;
      default: // 's'
        setWidth(17);
        setHeight(6);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        distance = 20;
        setCircleAttributes([
          { cx: -2.94231, cy: 3, r: 2.94231, fill: '#D315FF', delay: 1.33 },
          {
            cx: -1.79808,
            cy: 2.83333,
            r: 1.79808,
            fill: '#6A4DFF',
            delay: 0.67,
          },
          { cx: -2.94231, cy: 2.83317, r: 1.14423, fill: '#2D6DFF', delay: 0 },
        ]);
    }
  }, [size]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {circleAttributes.map((attr, index) => (
        <Circle key={index} {...attr} distance={width} />
      ))}
    </svg>
  );
}
