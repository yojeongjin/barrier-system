import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: string | JSX.Element;
  onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, onCloseModal } = props;

  useEffect(() => {
    // 외부화면 스크롤방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 모달 밖 클릭시 모달 off
  const outside = useRef<HTMLDivElement | null>(null);
  const handleOutside = (e: MouseEvent) => {
    if (!outside.current?.contains(e.target as Node)) {
      onCloseModal();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return (
    <ModalBase>
      <ModalInner ref={outside}>{children}</ModalInner>
    </ModalBase>
  );
};

export default Modal;

const ModalBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
`;

const ModalInner = styled.div`
  background: #fff;
  width: 100%;
  max-width: 720px;
  border-radius: 8px;
`;
