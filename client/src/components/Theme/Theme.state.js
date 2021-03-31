const UseThemeState = (setDark, setLight) => {
  const handleTheme = (e) => {
    const theme = e.target.id;
    if (theme.includes('dark')) {
      setDark();
    } else {
      setLight();
    }
  };
  return [handleTheme];
};

export default UseThemeState;
