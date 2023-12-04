import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const SvgWrapper = styled.div`
  width: 12.9706rem;
  height: 13.0405rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.text`
  fill: #fff;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Span = styled.tspan`
  font-size: 4.8rem;
`;

const ProgressCircle = ({ percentage }: { percentage: number }) => {
  const radius = 79.4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const [offset, setOffset] = useState(circumference);
  const [startAnimation, setStartAnimation] = useState(false);

  const svgWrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (svgWrapperRef.current) {
      observer.observe(svgWrapperRef.current);
    }

    return () => {
      if (svgWrapperRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(svgWrapperRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setOffset(strokeDashoffset);
  }, [percentage, strokeDashoffset]);

  const Path = styled.path.attrs<{ animate: boolean }>(() => ({}))<{
    animate: boolean;
  }>`
    ${({ animate }) =>
      animate &&
      css`
        animation: ${keyframes`
          0% {
            stroke-dashoffset: ${circumference};
          }
          100% {
            stroke-dashoffset: ${offset};
          }
        `} 1s linear forwards;
      `}
  `;

  return (
    <SvgWrapper ref={svgWrapperRef}>
      <svg width="100%" height="100%" viewBox="0 0 182 182">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FA00FF" />
            <stop offset="100%" stopColor="#0085FF" />
          </linearGradient>
        </defs>
        <Path
          animate={startAnimation}
          d="M91 11.519C47.1038 11.519 11.519 47.1038 11.519 91C11.519 134.896 47.1038 170.481 91 170.481C134.896 170.481 170.481 134.896 170.481 91C170.481 47.1038 134.896 11.519 91 11.519Z"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="12"
          strokeDasharray={`${strokeDasharray}`}
          strokeLinecap="round"
          strokeDashoffset={`${offset}`}
          transform="rotate(20 91 91)"
        />
        <Text x="50%" y="50%" textAnchor="middle" dy=".9em">
          <Span>{percentage}</Span> %
        </Text>
      </svg>
    </SvgWrapper>
  );
};

export default ProgressCircle;
