import axios from 'axios';

export const handleBarrier = async (cmd: 'entry' | 'exit', token: string) => {
  const body = {
    cmd,
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/barrier`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
