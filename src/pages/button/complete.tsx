import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
// container
import CompleteCotainer from '../../container/Button/CompleteCotainer';
// type
import { BtnDataProps } from '@/type/buttonType';
// utils
import checkToken from '@/utils/checkToken';

const complete: NextPage<BtnDataProps> = ({ btnInfo }) => {
  return <CompleteCotainer btnInfo={btnInfo} />;
};

export default complete;

// ssr
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // cookie 내 토큰으로 info 받아옴
  const tokenResult = await checkToken(context);

  if (tokenResult) {
    return {
      props: {
        btnInfo: tokenResult,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
