import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../../containers/Auth/SignIn';
import SignUp from '../../containers/Auth/SignUp';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen options={{ headerShown: false }} name="Sign In" component={SignIn} />
    <Stack.Screen name="Sign Up" component={SignUp} />
  </Stack.Navigator>
);

export default AuthNavigation;
