import {createAppContainer} from 'react-navigation';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import {createStackNavigator} from 'react-navigation-stack';

//Auth navigator which navigate between login and sign up pages
const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AuthNavigator);
