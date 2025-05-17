import axios from 'axios';

export const getReduction = async (
  carNo: string,
  signal: AbortSignal
): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/entry`,
      { carno: carNo },
      { signal } // AbortSignal 전달
    );

    if (data.ERRORCODE === '0000') {
      const { MERIT, ECO, DISABLED, CARCC } = data.ESB;

      if (MERIT === 'Y') return 'MERIT'; // 국가유공자
      if (ECO === 'Y') return 'ECO'; // 저공해
      if (DISABLED === 'Y') return 'DISABLED'; // 장애인
      if (Number(CARCC) < 1000) return 'CARCC'; // 경차
    }

    // ERRORCODE가 0이 아니거나 조건에 맞는 값이 없으면 GENERAL 반환
    return 'GENERAL';
  } catch (err) {
    console.error(err);
    // 입차는 해야하니까 일단 GENERAL 반환
    return 'GENERAL';
  }
};
