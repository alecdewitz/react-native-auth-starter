import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppFonts from '../../assets/fonts';
import { Text } from '../../components';
import Tabs from '../../components/Layout/Tabs';
import Conversation from '../../containers/Connections/Conversation';
import { normalize } from '../../utils/size';

const Stack = createStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleStyle: {
        fontFamily: AppFonts.Poppins_Regular,
      },
      headerTitleStyle: { fontFamily: AppFonts.Poppins_Regular },
    }}>
    <Stack.Screen options={{ headerShown: false }} name="App" component={Tabs} />
    <Stack.Screen
      options={({ navigation, route }: any) => {
        return {
          headerShown: true,
          headerMode: 'screen',
          cardOverlayEnabled: true,
          cardShadowEnabled: true,
          gestureResponseDistance: 300,
          headerBackTitle: 'Back',
          title: route.params.name,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingLeft: normalize(16), paddingRight: normalize(16) }}
              onPress={() => alert('This is a button!')}>
              <Text style={{ fontSize: normalize(16), color: DefaultTheme.colors.primary }}>
                Options
              </Text>
            </TouchableOpacity>
          ),
        };
      }}
      name="Conversation"
      component={Conversation}
    />
  </Stack.Navigator>
);

export default AppNavigation;
