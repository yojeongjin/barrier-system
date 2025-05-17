import { GetServerSidePropsContext } from 'next';

export default function deleteCookie(
  cookieName: string,
  context?: GetServerSidePropsContext
) {
  if (typeof window !== 'undefined') {
    // 클라이언트에서 삭제
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  } else if (context?.res) {
    // 서버에서 삭제
    context.res.setHeader('Set-Cookie', [
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
    ]);
  }
}
