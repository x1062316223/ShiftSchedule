import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {stylesSignup} from '../assets/styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  updateEmail,
  updatePassword,
  signup,
  updateFirstName,
  updateLastName,
} from '../actions/user';

class Signup extends React.Component {
  static navigationOptions = {
    title: 'Signup',
  };
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  handleSignUp = () => {
    if (this.props.signup()) {
    } else {
      this.props.navigation.navigate('ManagerDashboard');
    }
  };
  render() {
    return (
      <View style={stylesSignup.container}>
        <TextInput
          style={stylesSignup.inputBox}
          value={this.props.user.email}
          onChangeText={email => this.props.updateEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={stylesSignup.inputBox}
          value={this.props.user.firstname}
          onChangeText={firstname => this.props.updateFirstName(firstname)}
          placeholder="Firstname"
          autoCapitalize="none"
        />
        <TextInput
          style={stylesSignup.inputBox}
          value={this.props.user.lastname}
          onChangeText={lastname => this.props.updateLastName(lastname)}
          placeholder="Lastname"
          autoCapitalize="none"
        />
        <TextInput
          style={stylesSignup.inputBox}
          value={this.props.user.password}
          onChangeText={password => this.props.updatePassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={stylesSignup.button}
          onPress={this.handleSignUp}>
          <Text style={stylesSignup.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {updateEmail, updatePassword, signup, updateFirstName, updateLastName},
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
