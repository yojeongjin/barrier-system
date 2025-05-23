import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useEffect } from 'react';
// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalstyles';
import theme from '../styles/theme';
import '../styles/fonts/index.css';
// components
import A2HS from '@/components/Common/A2HS';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <A2HS />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
