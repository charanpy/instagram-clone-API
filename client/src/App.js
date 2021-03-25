import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './helpers/theme';
import AppRoute from './Route/Route';
import Alert from './components/Alert/Alert';

const App = () => {
  console.log();
  return (
    <ThemeProvider theme={darkTheme}>
      <Alert />
      <AppRoute />
    </ThemeProvider>
  );
};

export default App;
