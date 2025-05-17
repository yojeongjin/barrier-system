import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import axios from 'axios';
// component
import HomeCotainer from '@/container/Home/HomeContainer';
// type
import { PlaceDataProps } from '@/type/placeType';
// utils
import checkToken from '@/utils/checkToken';

const Home: NextPage<PlaceDataProps> = ({ placeInfo }) => {
  return <HomeCotainer placeInfo={placeInfo} />;
};

export default Home;

// ssr
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 쿠키 내 토큰 있으면 button 페이지로 redirect
  const tokenResult = await checkToken(context);

  if (tokenResult) {
    return {
      redirect: {
        permanent: false,
        destination: '/button',
      },
    };
  }

  try {
    // 없으면 주차장 정보 받아오기
    const res = await axios.post(
      `${process.env.NEXT_SERVER_APP_API_KEY}/v1/placeinfo`
    );
    const placeInfo = res.data.data[0];

    return {
      props: { placeInfo },
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    // 에러페이지로 이동
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
