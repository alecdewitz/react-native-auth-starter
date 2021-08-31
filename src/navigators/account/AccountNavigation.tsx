import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppFonts from '../../assets/fonts';
import Account from '../../containers/Account/Account';
import Profile from '../../containers/Account/Profile';

const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerMode: 'screen',
        cardOverlayEnabled: true,
        cardShadowEnabled: true,
        gestureResponseDistance: 300,
        headerTitleStyle: { fontFamily: AppFonts.Poppins_Regular },
      }}>
      <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
