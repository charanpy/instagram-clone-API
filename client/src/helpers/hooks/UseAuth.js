import { useEffect } from 'react';

const UseAuth = (loadUser, setAuth, history, getNotification) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loadUser();
      return true;
    }
    setAuth();
    history.push('/');
    return false;
  }, [loadUser, setAuth, history]);

  useEffect(() => {
    getNotification();
  }, [getNotification]);
};

export default UseAuth;
