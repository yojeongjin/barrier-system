import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// container
import BtnCotainer from '@/container/Button/BtnContainer';
// type
import { BtnDataProps } from '@/type/buttonType';
// utils
import checkToken from '@/utils/checkToken';
import saveCookie from '@/utils/saveCookie';
import { checkPaidStatus, getUsageList, reissueToken } from '@/utils/api';

const button: NextPage<BtnDataProps> = ({ btnInfo }) => {
  const router = useRouter();
  const name = 'pfOTK/NONE';
  const token = {
    token: btnInfo.token,
  };

  const handleCheckPaidStatus = async () => {
    try {
      // 무인정산기에서 결제했는지 확인 처리
      const checkPaid = await checkPaidStatus(token);

      if (checkPaid !== null) {
        // 이용 완료 페이지로 이동
        return router.push({
          pathname: '/button/complete',
        });
      }
    } catch (error) {
      // 에러페이지로 이동
      return router.push({
        pathname: '/error',
      });
    }
  };

  useEffect(() => {
    // 토큰 내 쿠키 저장
    saveCookie(name, token);
    // 결제 여부 확인
    handleCheckPaidStatus();
  }, [btnInfo]);

  return <BtnCotainer btnInfo={btnInfo} />;
};

export default button;

// ssr
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 쿠키 내 토큰이 있는지확인
  const tokenResult = await checkToken(context);

  // 토큰 사용 유효함
  if (tokenResult.status === 'VALID') {
    return {
      props: {
        btnInfo: tokenResult,
      },
    };
  }

  // 토큰 만료
  if (tokenResult.status === 'EXPIRED') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // 토큰 없음
  const { carno, phoneno } = context.query;
  if (carno && phoneno) {
    const body = {
      car_number: carno,
      phone_number: phoneno,
      pf_parkinglot_id: 111111,
    };
    try {
      const usageData = await getUsageList(body);

      if (
        usageData.parkingitem_status === 'PARK_IN' ||
        usageData.parkingitem_status === 'CREATED'
      ) {
        const reqData = {
          car_number: carno,
          phone_number: phoneno,
          parkinglist_id: usageData.parkinglist_id,
        };

        const token = await reissueToken(reqData);
        return {
          props: {
            btnInfo: {
              ...usageData,
              token: token,
            },
          },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
    } catch (err) {
      console.error('Error fetching data:', err);

      return {
        redirect: {
          destination: '/error',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
