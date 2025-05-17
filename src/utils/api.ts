import axios from 'axios';

export const getUsageList = async (body: Record<string, any>) => {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_APP_API_KEY}/v1/usage`,
    body
  );
  return res.data.data.list[0];
};

export const reissueToken = async (body: Record<string, any>) => {
  const res = await axios.post(
    `${process.env.NEXT_SERVER_APP_API_KEY}/v1/reissue`,
    body
  );
  return res.data.data.token;
};

export const checkPaidStatus = async (body: Record<string, any>) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/paid`,
    body
  );
  return res.data.data.paidWith;
};
