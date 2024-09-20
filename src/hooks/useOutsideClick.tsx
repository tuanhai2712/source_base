import { useEffect, RefObject } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: Function) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
