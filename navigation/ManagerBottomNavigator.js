import Dashboard from '../ManagerScreens/Dashboard';
import ListCheck from '../ManagerScreens/ListCheck';
import DateNav from './DateNav';
import React from 'react';

import Employees from '../ManagerScreens/Employees';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ManagerBottomNavigator = createMaterialBottomTabNavigator(
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
    Employees: {screen: Employees},
  },
  {
    //set up initial page and bottom tabs attributes
    initialRouteName: 'Home',
    barStyle: {backgroundColor: 'white'},
    //add animated shifting
    shifting: true,
  },
);
export default createAppContainer(ManagerBottomNavigator);
