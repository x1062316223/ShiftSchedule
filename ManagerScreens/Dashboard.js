//This is an example code for Bottom Navigation//
import React from 'react';
import Firebase from '../config/Firebase';
//import react in our code.
import {View, Button} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../assets/styles';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';

class Dashboard extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon name="home" size={22} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  handleSignout = () => {
    Firebase.auth().signOut();
    AsyncStorage.removeItem('position');
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <View>
        <Header
          containerStyle={styles.header}
          centerComponent={{text: 'Dashboard', style: {color: '#fff'}}}
        />
        <Button
          title="Manager"
          onPress={() => this.props.navigation.navigate('Schedule')}
        />
        <Button title="Logout" onPress={() => this.handleSignout()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
