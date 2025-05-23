import { useEffect, useState } from 'react';
import { BeforeInstallPromptEvent } from '../../@types/beforeInstallPrompt';

export const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const install = () => {
    if (deferredPrompt === null) return;

    deferredPrompt.prompt(); // 설치창 띄움
    deferredPrompt.userChoice.then(() => setDeferredPrompt(null)); // 결과 후 초기화
  };

  const clearPrompt = () => setDeferredPrompt(null); // UI에서 취소할 수 있게

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault(); // 자동 설치 방지
      setDeferredPrompt(e); // 상태로 저장해둠
    };

    window.addEventListener('beforeinstallprompt', handler as any);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any);
    };
  }, []);

  return { deferredPrompt, install, clearPrompt };
};
