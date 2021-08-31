import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Search from '../../containers/Search/Search';
import { normalize } from '../../utils/size';
import { LogoHeader } from '../../assets/images';
import { Image } from 'react-native';
import Account from '../../containers/Account/Account';
import SearchFilters from '../../containers/Search/SearchFilters';
import AppFonts from '../../assets/fonts';

const Stack = createStackNavigator();

const SearchNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerMode: 'screen',
      cardOverlayEnabled: true,
      cardShadowEnabled: true,
      gestureResponseDistance: 300,
      headerTitleStyle: { fontFamily: AppFonts.Poppins_Regular },
    }}
    initialRouteName="SearchHome">
    <Stack.Screen
      options={({ navigation, route }: any) => {
        return {
          headerShown: true,
          headerLeft: () => (
            <Image source={LogoHeader} style={{ width: normalize(50) }} resizeMode="contain" />
          ),
        };
      }}
      name="Search"
      component={Search}
    />
    <Stack.Screen
      options={({ navigation, route }: any) => {
        return {
          headerShown: false,
        };
      }}
      name="SearchProfile"
      component={Account}
    />
  </Stack.Navigator>
);

export default SearchNavigation;
