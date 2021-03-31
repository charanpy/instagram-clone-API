import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import AppRoute from './Route/Route';
import Alert from './components/Alert/Alert';
import Header from './components/shared/Header/Header.container';
import { lightTheme, darkTheme } from './helpers/theme';

const App = ({ theme }) => {
  console.log('APP');
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Header />
      <AppRoute />
      <Alert />
      <ToastContainer />
    </ThemeProvider>
  );
};

App.propTypes = {
  theme: PropTypes.string.isRequired,
};
export default App;
