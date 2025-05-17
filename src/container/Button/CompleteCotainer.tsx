import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
// utils
import deleteCookie from '@/utils/deleteCookie';
// type
import { BtnDataProps } from '@/type/buttonType';
// component
import Loading from '@/components/Common/Loading';
import CompleteInfo from '@/components/Button/CompleteInfo';
import { handleBarrier } from '@/utils/handleBarrier';

const CompleteCotainer = ({ btnInfo }: BtnDataProps) => {
  const router = useRouter();
  // loading state
  const [openLoading, setOpenLoading] = useState(false);
  const name = 'pfOTK/NONE';
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
      <CompleteInfo btnInfo={btnInfo} doExit={doExit} />
      {openLoading && (
        <Loading>
          <LoadingH1>잠시 후 차단기가 열립니다</LoadingH1>
        </Loading>
      )}
    </BtnBase>
  );
};

export default CompleteCotainer;

const BtnBase = styled.main`
  margin-top: 60px;
  padding: 0 16px;
`;

const LoadingH1 = styled.h1`
  font-weight: 500;
  font-size: 20px;
`;
