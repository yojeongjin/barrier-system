import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  children: string | JSX.Element;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  return (
    <LoadingBase>
      <LoadingInner>
        {/* 로딩 Paragraph */}
        <LoadingPhraseBox>
          <LoadingH1>{children}</LoadingH1>
          <LoadingP>창을 닫지마시고 잠시만 기다려주세요</LoadingP>
        </LoadingPhraseBox>
        {/* 로딩 애니메이션 */}
        <LoadingAnimation>
          <LoadingBoxes>
            <LoadingBox>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingBox>
            <LoadingBox>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingBox>
            <LoadingBox>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingBox>
            <LoadingBox>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingBox>
          </LoadingBoxes>
        </LoadingAnimation>
      </LoadingInner>
    </LoadingBase>
  );
};

export default Loading;

// animation keyframes
const box1 = keyframes`
0%,
50% {
    transform: translate(100%, 0);
}
100% {
    transform: translate(200%, 0);
}
`;

const box2 = keyframes`
0%{
  transform: translate(0, 100%);
}
50% {
  transform: translate(0, 0);
}
100% {
  transform: translate(100%, 0);
}
`;

const box3 = keyframes`
0%,
50% {
    transform: translate(100%, 100%);
}
100% {
    transform: translate(0, 100%);
}
`;

const box4 = keyframes`
0%{
  transform: translate(200%, 0);
}
50% {
  transform: translate(200%, 100%);
}
100% {
  transform: translate(100%, 100%);
}
`;

const LoadingBase = styled.div`
  background-color: #fff;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LoadingInner = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 50px 0;
  height: calc(var(--vh, 1vh) * 100);
  line-height: 1.8;
`;

// 로딩 Paragraph

const LoadingPhraseBox = styled.div`
  margin: 20px 0 0;
  padding: 0 20px;
`;

const LoadingH1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;

const LoadingP = styled.p`
  color: ${(props) => props.theme.gray_02};
`;

// 로딩 애니메이션

const LoadingAnimation = styled.div`
  height: calc(100% - 83px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingBox = styled.div``;

const LoadingBoxes = styled.div`
  position: relative;
  width: 96px;
  height: 64px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);

  ${LoadingBox} {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    left: 0;
    transform-style: preserve-3d;

    &:nth-child(1) {
      transform: translate(100%, 0);
      animation: ${box1} 800ms linear infinite;
    }
    &:nth-child(2) {
      transform: translate(0, 100%);
      animation: ${box2} 800ms linear infinite;
    }
    &:nth-child(3) {
      transform: translate(100%, 100%);
      animation: ${box3} 800ms linear infinite;
    }
    &:nth-child(4) {
      transform: translate(200%, 0);
      animation: ${box4} 800ms linear infinite;
    }

    & > div {
      background: #a3e695;
      position: absolute;
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      width: 100%;
      height: 100%;
      transform: rotateY(0deg) rotateX(0deg) translateZ(16px);

      &:nth-child(1) {
        top: 0;
        left: 0;
      }
      &:nth-child(2) {
        background: #02ca2d;
        right: 0;
        transform: rotateY(90deg) rotateX(0deg) translateZ(16px);
      }
      &:nth-child(3) {
        background: #6adc50;
        transform: rotateY(0deg) rotateX(-90deg) translateZ(16px);
      }
      &:nth-child(4) {
        background: #d6f2dc;
        top: 0;
        left: 0;
        transform: rotateY(0deg) rotateX(0deg) translateZ(calc(32px * 3 * -1));
      }
    }
  }
`;
