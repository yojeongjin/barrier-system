import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
// react-spring
import { useSpring, animated } from '@react-spring/web';

interface BottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
  height: number;
  children: string | JSX.Element;
}

const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  const { isOpen, onClose, height, children } = props;

  const [isInDOM, setIsInDOM] = useState(false);
  const bodyOverflowStyleRef = useRef<string | null>(null);
  const topRef = useRef<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const heightPixel = children
    ? contentRef.current?.offsetHeight
    : height || window.innerHeight / 2;

  const [springProps, api] = useSpring(() => ({
    height: '0px',
    onRest: {
      height: (height) => {
        if (height.value === `${heightPixel}px`) {
          return;
        }
        if (height.value === '0px') {
          setIsInDOM(false);
        }
      },
    },
  }));

  const handleContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );

  useEffect(() => {
    if (typeof document !== 'undefined' && isOpen) {
      const currY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      bodyOverflowStyleRef.current = document.body.style.overflow;
      topRef.current = document.body.style.top;
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${currY}px`;
      setIsInDOM(true);
    } else if (!isOpen) {
      api.start({ height: '0px', immediate: false });
    }
  }, [isOpen, api]);

  useEffect(() => {
    if (isInDOM) {
      api.start({ height: `${heightPixel}px` });
    } else if (
      typeof document !== 'undefined' &&
      document.body.style.overflow === 'hidden'
    ) {
      document.body.style.overflow = bodyOverflowStyleRef.current || '';
      document.body.style.top = topRef.current || '';
    }
  }, [isInDOM, api]);

  useEffect(() => {
    return () => {
      if (
        typeof document !== 'undefined' &&
        document.body.style.overflow === 'hidden'
      ) {
        document.body.style.overflow = bodyOverflowStyleRef.current || '';
        document.body.style.top = topRef.current || '';
      }
    };
  }, []);

  if (!children && !isInDOM) return null;

  return (
    <>
      {isInDOM && <BottomBase onClick={onClose} />}
      <BottomInner style={springProps} onClick={handleContentClick}>
        <ChildrenContainer isopen={isOpen} ref={contentRef}>
          {children}
        </ChildrenContainer>
      </BottomInner>
    </>
  );
};

export default BottomSheet;

const BottomBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  inset: 0;
  z-index: 999;
`;

const BottomInner = styled(animated.div)`
  background-color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 720px;
  z-index: 999;
  border-radius: 15px 15px 0 0;
`;

const ChildrenContainer = styled.div<{ isopen: boolean }>`
  display: ${(props) => (props.isopen ? 'block' : 'none')};
`;
