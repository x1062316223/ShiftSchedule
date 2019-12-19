import ManagerBottomNavigator from '../navigation/ManagerBottomNavigator';
import StaffBottomNavigator from '../navigation/StaffBottomNavigator';
import AuthNavigator from '../navigation/AuthNavigator';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const Navigator = createSwitchNavigator(
  {
    Login: {screen: AuthNavigator},
    ManagerDashboard: {screen: ManagerBottomNavigator},
    StaffDashboard: {screen: StaffBottomNavigator},
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(Navigator);
