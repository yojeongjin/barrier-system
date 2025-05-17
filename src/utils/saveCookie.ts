export default function saveCookie(name: string, cookieInfo: any) {
  // 만료기한
  // 만료기한을 9999년 12월 31일로 설정
  const expires = new Date(Date.UTC(9999, 11, 31, 23, 59, 59));
  const daysToExpire = expires.toUTCString();

  // 사용중인 브라우저를 체크하는 browserChecker
  const browserChecker = window.navigator.userAgent;
  // 사파리에서 한글 value로 된 cookie 인식 못하는 issue
  if (browserChecker.includes('Safari') && !browserChecker.includes('Chrome')) {
    const info = JSON.stringify(cookieInfo);
    const initialCookie = name + '=' + encodeURI(info);
    document.cookie = `${initialCookie}; path=/; expires=${daysToExpire}`;
  } else {
    const initialCookie = name + '=' + JSON.stringify(cookieInfo);
    // document.cookie = initialCookie;
    document.cookie = `${initialCookie}; path=/; expires=${daysToExpire}`;
  }

  return true;
}
