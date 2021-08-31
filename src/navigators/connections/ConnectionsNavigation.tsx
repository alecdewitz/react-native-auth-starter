import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import AppFonts from '../../assets/fonts';
import { LogoHeader } from '../../assets/images';
import Account from '../../containers/Account/Account';
import Connections from '../../containers/Connections/Connections';
import { normalize } from '../../utils/size';

const Stack = createStackNavigator();

const ConnectionsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        cardOverlayEnabled: true,
        cardShadowEnabled: true,
        gestureResponseDistance: 300,
        headerTitleStyle: { fontFamily: AppFonts.Poppins_Regular },
      }}
      initialRouteName="ConnectionsHome">
      <Stack.Screen
        options={({ navigation, route }: any) => {
          return {
            headerShown: true,
            headerLeft: () => (
              <Image source={LogoHeader} style={{ width: normalize(50) }} resizeMode="contain" />
            ),
          };
        }}
        name="Connections"
        component={Connections}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ConnectionsAccount"
        component={Account}
      />
    </Stack.Navigator>
  );
};

export default ConnectionsNavigation;
