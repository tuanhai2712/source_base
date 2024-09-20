import { useState } from 'react';

export const useToggleValue = (initValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initValue);
  const toggleValue = () => setValue((prevState) => !prevState);
  return [value, toggleValue];
};
