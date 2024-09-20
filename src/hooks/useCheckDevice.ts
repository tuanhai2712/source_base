import { useEffect, useState } from 'react';

export const useCheckDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowSizeChange);
      window.addEventListener('orientationchange', handleWindowSizeChange);
      window.addEventListener('load', handleWindowSizeChange);
      window.addEventListener('reload', handleWindowSizeChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowSizeChange);
        window.removeEventListener('orientationchange', handleWindowSizeChange);
        window.removeEventListener('load', handleWindowSizeChange);
        window.removeEventListener('reload', handleWindowSizeChange);
      }
    };
  }, []);

  return { isMobile };
};
