import styled from 'styled-components';
import { useA2HS } from '@/hooks/useA2HS';
import { isValidateA2HS, setInstallA2HS } from '@/utils/a2hs';

// common
import Modal from './Modal';
import H4 from './Title/H4';
import ApplyBtn from './Button/ApplyButton';

const A2HS = () => {
  const { deferredPrompt, install, clearPrompt } = useA2HS();

  // 조건 1: 이벤트 없음 / 조건 2: 일주일 숨김 상태
  if (!deferredPrompt || isValidateA2HS()) return null;

  return (
    <Modal
      onCloseModal={() => {
        console.log('e');
      }}
    >
      <H4>바로가기 추가</H4>
      <ModalP>홈화면에 추가하시겠어요?</ModalP>
      <CancelBtn
        onClick={
          setInstallA2HS(); // 7일간 숨김
          clearPrompt();        // 현재 프롬프트 초기화
        }
      >아니오</CancelBtn>
      <ApplyBtn
        onClick={
          install();
        }
      >추가하기</ApplyBtn>
    </Modal>
  );
};

export default A2HS;

const ModalP = styled.p``;
