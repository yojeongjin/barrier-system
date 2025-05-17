import { useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import styled from 'styled-components';
// utils
import deleteCookie from '@/utils/deleteCookie';
import { sendAlimtalk } from '@/utils/alimtalk';
import { handleBarrier } from '@/utils/handleBarrier';
// type
import { BtnDataProps } from '@/type/buttonType';
// component
import ButtonProgress from '@/components/Button/ButtonProgress';
import ButtonInfo from '@/components/Button/ButtonInfo';
import Loading from '@/components/Common/Loading';
import ApplyBtn from '@/components/Common/Button/ApplyButton';

const BtnCotainer = ({ btnInfo }: BtnDataProps) => {
  const router = useRouter();
  const name = 'pfOTK/NONE';
  // loading state
  const [openLoading, setOpenLoading] = useState(false);
  // 이용 요금
  const [fee, setFee] = useState(0);

  // 입차
  const handleEntry = async () => {
    const useFrom = dayjs(btnInfo.use_from);
    const currentTime = dayjs();

    if (currentTime.diff(useFrom, 'm') > 10) {
      alert('입차 가능 시간을 초과하였습니다. 주차권을 재구매해주세요.');
      deleteCookie(name);

      return router.push('/');
    }

    try {
      setOpenLoading(true);
      // 차단기 열기
      const res = await handleBarrier('entry', btnInfo.token);

      if (res.status === 200) {
        // 입차하면 알림톡 발송
        const alimtalkResponse = await sendAlimtalk({ btnInfo });

        // AlimTalk 성공 시 reload
        if (alimtalkResponse && alimtalkResponse.statusCode === '202') {
          window.location.reload();
        } else {
          alert('알림톡 발송에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        return alert(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenLoading(false);
    }
  };

  const handleExit = async () => {
    // 감면 차량이면 50%
    const finalFee = btnInfo.reduction_type === 'GENERAL' ? fee : fee / 2;

    if (finalFee === 0) {
      // 회차 시간 이내이면 차단기 열기
      doExit();
    } else {
      // 회차 시간 지나면 결제 페이지
      router.push(`/payment/${finalFee}`);
    }
  };

  // 출차 차단기 열기
  const doExit = async () => {
    try {
      setOpenLoading(true);
      const res = await handleBarrier('exit', btnInfo.token);

      if (res.result === 'PF_200') {
        deleteCookie(name);
        return router.push('/');
      } else {
        return alert(res.data.info.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenLoading(false);
    }
  };

  return (
    <BtnBase>
      <ButtonProgress btnInfo={btnInfo} fee={fee} setFee={setFee} />
      <ButtonInfo btnInfo={btnInfo} />
      {/* 입출차 버튼 */}
      {btnInfo.parking_status === 'CREATED' ? (
        <ApplyBtn onClick={handleEntry}>입차하기</ApplyBtn>
      ) : (
        <ApplyBtn onClick={handleExit}>출차하기</ApplyBtn>
      )}
      {openLoading && <Loading>잠시 후 차단기가 열립니다</Loading>}
    </BtnBase>
  );
};

export default BtnCotainer;

const BtnBase = styled.main`
  height: calc(var(--vh, 1vh) * 100 - 50px);
  margin-top: 50px;
  padding: 0 16px;
`;
