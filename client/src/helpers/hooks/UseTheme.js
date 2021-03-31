import { useEffect } from 'react';
import { getTheme } from '../helpers';

const UseTheme = (setThemeLight) => {
  useEffect(() => {
    const userPreferredTheme = getTheme();
    if (userPreferredTheme && userPreferredTheme === 'light') {
      setThemeLight();
    }
  }, [setThemeLight]);
};

export default UseTheme;
