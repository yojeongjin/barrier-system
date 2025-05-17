# 파프차단기 - 차단기 제어 웹앱 예시 코드

> 파프차단기는 주차장 입구에 설치된 QR을 통해 웹앱에 접속하고,
> 차량번호 + 휴대폰번호 기반으로 주차권(OTK)을 발급받아 하드웨어 차단기를 제어하는 시스템입니다.

💡 실제 하드웨어 및 결제 연동 API를 포함하고 있어 테스트용 API는 제공되지 않으며,
운영 중인 시스템의 핵심 흐름을 일부 발췌해 **흐름과 구조 이해를 위한 예시 코드로 구성** 되어 있습니다.

## 1. 플로우 차트

![flowchart](./public/images/flowchart.png)

## 2. 동작 예시 (GIF)

### 2-1. 주차권-OTK(One Time Key) 발급 시뮬레이션

```
[홈페이지] → [주차권 발급] → [입차] → [차단기 열림]
```

<img src="./public/images/create.gif" width="300" height="620"/>

### 2-2. 결제 및 출차 시뮬레이션

```
[알림톡 수신] → [출차 시도] → [결제] → [이용완료 화면]  → [출차]  → [차단기 열림] → [홈으로 이동]
```

<img src="./public/images/payment.GIF" width="300" height="620"/>

## 3. 기술스택

| 구분          | 내용                                                   |
| ------------- | ------------------------------------------------------ |
| 프론트엔드    | Next.js (SSR), React, styled-components, TypeScript    |
| 백엔드        | Node.js, Express, TypeScript                           |
| DB            | MySQL + Sequelize ORM                                  |
| 인증          | JWT 기반 토큰 발급 및 검증                             |
| 외부 연동     | 행안부 차량 정보 API, 카카오 알림톡                    |
| 하드웨어 제어 | HTTP API 방식 차단기 제어                              |
| 배포 환경     | NHN Cloud Linux 인스턴스,PM2 기반 무중단 프로세스 운영 |

## 4. 프로젝트 구조

```
📁 barrier-system/
├── back/                  # 백엔드
│   ├── controller/        # 핵심 컨트롤러 (token, barrier 등)
│   ├── middleware/        # JWT 인증 처리
│   ├── model/             # Sequelize 모델
│   ├── routes/            # API 라우터
│   ├── utils/             # 공통 유틸
│   └─  ...
├── src/                   # 프론트엔드
│   ├── pages/             # Next.js 페이지
│   ├── container/         # 각 페이지 로직
│   ├── components/        # UI 컴포넌트
│   ├── utils/             # 프론트 API 유틸 함수
│   └─  ...
├── .env
├── app.ts                 # Express 서버 엔트리
├── package.json
├── ...

```

---

## 5. 인증 및 흐름 상세

### 5-1. 토큰(OTK)발급 - (POST /v1/token)

**📌 사용자가 차량번호와 전화번호를 입력하면 서버는 주차권(One-Time-Key)을 JWT 형태로 발급합니다.**  
감면 대상 여부는 행안부 API를 통해 조회되며 발급된 토큰은 쿠키에 저장되어 인증에 사용됩니다.

**[프론트]**

1. 차량번호 + 전화번호 입력
2. `getReduction()`으로 감면 대상 여부 확인 (행안부 API 연동)
3. 감면 유형과 함께 `/v1/token` 호출 → JWT 발급
4. 쿠키에 토큰 저장 후 `/button` 페이지로 이동

**[백엔드]**

```ts
// 중복 주차권 존재 여부 확인
await Parking.findAll({
  where: {
    car_number: car_number,
    phone_number: phone_number,
    parking_status: {
      [Op.in]: ['CREATED', 'PARK_IN'],
    },
  },
});

// 새로운 주차권 발급 - JWT 생성
const token = jwt.sign({ ...parkingInfo }, process.env.JWT_KEY);
```

---

### 5-2. 차단기 제어 - POST /v1/barrier

📌 사용자가 ‘입차’ 또는 ‘출차’ 버튼을 누르면 서버는 **JWT를 통해 유효성을 검증한 후
HTTP API를 통해 실제 barrier(하드웨어)를 열고**, DB에 주차 상태를 업데이트합니다.

```ts
// 차단기 OPEN
await axios.post(`http://${하드웨어 url}`,
{
  action: 'open',
}, {
  headers: { Authorization: 'Bearer [하드웨어 고정 키]' }
}
);

// cmd 에 따른 주차 상태값 변경
await Parking.update({ parking_status: 'PARK_IN' | 'PARK_OUT' });
```

---

### 5-3. 알림톡 전송 - POST /v1/alimtalk

📌 입차 후 알림톡으로 출차 링크를 제공하여 QR 재스캔 없이도 출차 페이지에 접근 가능합니다.

```ts
const body = {
  receiver: btnInfo.phone_number,
  content: `차량번호: ${btnInfo.car_number}님, 입차 완료되었습니다. ...`,
  btn: `https://[domain]/button?carno=${carNo}&phoneno=${phoneNo}`,
};
```

---

### 5-4. 출차 처리

📌 사용자의 **감면 유형에 따라 요금을 계산**하고 회차시간 이내일 경우 차단기를 열고,
요금이 있을 경우 결제 페이지로 리다이렉션합니다.

```ts
// 감면유형에 따라 요금 계산
const finalFee = btnInfo.reduction_type === 'GENERAL' ? fee : fee / 2;

if (finalFee === 0) {
  handleBarrier('exit');
} else {
  router.push(`/payment/${finalFee}`);
}
```

```ts
// 출차 완료시 쿠키 내 token 삭제 → 홈 이동
const res = await handleBarrier('exit', btnInfo.token);

if (res.result === 'PF_200') {
  deleteCookie(name);
  return router.push('/');
}
...
```
