import Dashboard from '../StaffScreens/Dashboard';
import ListCheck from '../StaffScreens/ListCheck';
import DateNav from './DateNav';
import React from 'react';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StaffBottomNavigator = createMaterialBottomTabNavigator(
  {
    Home: {screen: Dashboard},
    ListCheck: {screen: ListCheck},
    Schedule: {
      //set up schedule package add icon on bottom tab
      screen: DateNav,
      navigationOptions: {
        tabBarIcon: <Icon name="calendar-alt" size={22} />,
      },
    },
  },
  {
    //set up initial page and bottom tabs attributes
    initialRouteName: 'Home',
    barStyle: {backgroundColor: 'white'},
    //add animated shifting
    shifting: true,
  },
);
export default createAppContainer(StaffBottomNavigator);
