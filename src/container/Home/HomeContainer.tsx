import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import axios from 'axios';
import styled from 'styled-components';
// utils
import { getReduction } from '@/utils/getReduction';
import saveCookie from '@/utils/saveCookie';
// type
import { PlaceDataProps } from '@/type/placeType';
// component
import H2 from '@/components/Common/Title/H2';
import Loading from '@/components/Common/Loading';
import HomeComponent from '@/components/Home/Home';

const HomeCotainer = ({ placeInfo }: PlaceDataProps) => {
  const router = useRouter();
  const [openLoading, setOpenLoading] = useState(false);
  // 이용정보
  const [usageInfo, setUsageInfo] = useState({
    carNo: '',
    phoneNo: '',
  });

  const getOTK = useCallback(async () => {
    try {
      setOpenLoading(true);

      const controller = new AbortController();
      // 행안부 api 3초 안에 응답없으면 타임아웃
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3초 후 타임아웃

      const reductionType = await getReduction(
        usageInfo.carNo,
        controller.signal
      );
      clearTimeout(timeoutId); // 타임아웃 해제

      if (!reductionType) return alert('차량을 확인할 수 없습니다.');

      const reqData = {
        car_number: usageInfo.carNo,
        phone_number: String(usageInfo.phoneNo),
        reduction_type: reductionType,
        use_from: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/token`,
        reqData
      );

      if (res.status === 200) {
        saveCookie('pfOTK/NONE', {
          token: res.data.data.token,
        });
        await router.push('/button');
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      alert('주차권 생성에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    } finally {
      setOpenLoading(false);
    }
  }, [usageInfo, router]);

  return (
    <HomeBase>
      <HomeComponent placeInfo={placeInfo} getOTK={getOTK} />
      {/* 주차권 생성 loading */}
      {openLoading && (
        <Loading>
          <H2>주차권 발급 중 입니다</H2>
        </Loading>
      )}
    </HomeBase>
  );
};

export default HomeCotainer;

const HomeBase = styled.main`
  background-color: #fafafa;
  height: calc(var(--vh, 1vh) * 100 - 50px);
  margin-top: 50px;
  overflow-y: scroll;
`;
