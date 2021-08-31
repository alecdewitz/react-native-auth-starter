import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from '../../store/actions/auth';
import { getCurrentUser, getToken } from '../../store/selectors';
import Auth from '../auth/AuthNavigation';
import AppNavigation from './AppNavigation';
import { navigationRef } from './AppNavigationService';

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (token) {
      dispatch(authMe());
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {!token && <Auth />}
      {token && <AppNavigation />}
    </NavigationContainer>
  );
};

export default App;
