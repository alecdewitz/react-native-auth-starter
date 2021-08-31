import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Private from '../../containers/Private';

const Stack = createStackNavigator();

const PrivateStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Private" component={Private} />
  </Stack.Navigator>
);

export default PrivateStack;
