import { GetServerSidePropsContext } from 'next';
import * as cookie from 'cookie';
import axios from 'axios';
import deleteCookie from './deleteCookie';

const checkToken = async (context: GetServerSidePropsContext) => {
  const cookies = context.req.headers.cookie || '';
  const parsedCookies = cookie.parse(cookies);

  if (!parsedCookies?.['pfOTK/NONE']) {
    // 쿠키 내 토큰 없음
    return {
      status: 'NO_COOKIE',
    };
  }

  try {
    const parsedCookieInfo = JSON.parse(parsedCookies['pfOTK/NONE']);

    const res = await axios.get(
      `${process.env.NEXT_SERVER_APP_API_KEY}/v1/parking`,
      {
        headers: {
          Authorization: `Bearer ${parsedCookieInfo.token}`,
        },
      }
    );

    const status = res.data.data.parking_status;
    if (status === 'PARK_OUT' || status === 'FINISHED') {
      deleteCookie('pfOTK/NONE', context); // context 전달

      // 만료처리
      return {
        status: 'EXPIRED',
      }; // 리다이렉트는 getServerSideProps에서 처리
    }

    return {
      ...res.data.data,
      token: parsedCookieInfo.token,
      status: 'VALID',
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      status: 'ERROR',
    };
  }
};

export default checkToken;
