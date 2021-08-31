import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AppFonts from '../../assets/fonts';
import Private from '../../containers/Private';
import AccountNavigation from '../../navigators/account/AccountNavigation';
import ConnectionsNavigation from '../../navigators/connections/ConnectionsNavigation';
import SearchNavigation from '../../navigators/search/SearchNavigation';
import { normalize } from '../../utils/size';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontFamily: AppFonts.Poppins_Regular },
      }}>
      <Tab.Screen
        name="ConnectionsTab"
        component={ConnectionsNavigation}
        options={{
          title: 'Connections',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="ios-chatbubble" color={color} size={normalize(size)} />
            ) : (
              <Icon name="ios-chatbubble-outline" color={color} size={normalize(size)} />
            ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchNavigation}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="ios-search" color={color} size={normalize(size)} />
            ) : (
              <Icon name="ios-search-outline" color={color} size={normalize(size)} />
            ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={Private}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="ios-star" color={color} size={normalize(size)} />
            ) : (
              <Icon name="ios-star-outline" color={color} size={normalize(size)} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={AccountNavigation}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="ios-person" color={color} size={normalize(size)} />
            ) : (
              <Icon name="ios-person-outline" color={color} size={normalize(size)} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
