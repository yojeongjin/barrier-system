import axios from 'axios';
import dayjs from 'dayjs';
// type
import { BtnDataProps } from '@/type/buttonType';

export const sendAlimtalk = async ({ btnInfo }: BtnDataProps) => {
  const body = {
    receiver: btnInfo.phone_number,
    content: `
    ${btnInfo.car_number}님 안녕하세요.
주차장에 입차 완료되어 안내 드립니다.

이용이 끝나시면 무인정산기에서 주차 요금 결제 후
아래의 출차하기 버튼을 클릭하여 출차 해주세요.

────────────
주차장명: 🅿 ${btnInfo.base_name}
차량번호: ${btnInfo.car_number}} 🚙
입차시간: ${dayjs().format('YYYY-MM-DD HH:mm')}
────────────

이용 유의사항은 홈화면에서 꼭 확인해 주세요.
이용해 주셔서 감사합니다.
    `,
    btn: `http:/${url}/button?carno=${btnInfo.car_number}&phoneno=${btnInfo.phone_number}`,
  };
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/alimtalk`,
      body
    );
    console.log('AlimTalk sent successfully:', response.data);

    return response.data; // 성공 응답 반환
  } catch (error) {
    console.error('Error sending AlimTalk:', error);
    throw error; // 에러 전달
  }
};
