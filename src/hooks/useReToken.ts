// useRecreateToken.ts
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// utils
import saveCookie from '@/utils/saveCookie';

type ReqType = {
  car_number: string | null;
  phone_number: string | null;
  parkinglist_id: number | null;
};

export const useRecreateToken = (body: ReqType) => {
  const router = useRouter();
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  const recreateToken = async () => {
    try {
      setOpenLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/retoken`,
        body
      );
      if (res.data.result === 'PF_200') {
        // 재발급 성공시 cookie 저장
        saveCookie('pfOTK/NONE', {
          token: res.data.data.token,
        });
        return router.push({
          pathname: '/button',
        });
      } else {
        alert(res.data.info.message);
        return router.push({
          pathname: '/history',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenLoading(false);
    }
  };

  return { openLoading, recreateToken };
};
