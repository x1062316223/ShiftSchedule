import Firebase, {db} from '../config/Firebase.js';
import {Alert} from 'react-native';

// define types
export const UPDATE_LASTNAME = 'UPDATE_LASTNAME';
export const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const UPDATE_POSITION = 'UPDATE_POSITION';

// actions

export const updateFirstName = firstname => {
  return {
    type: UPDATE_FIRSTNAME,
    payload: firstname,
  };
};
export const updatePosition = position => {
  return {
    type: UPDATE_POSITION,
    payload: position,
  };
};
export const updateLastName = lastname => {
  return {
    type: UPDATE_LASTNAME,
    payload: lastname,
  };
};

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

//signup user with user details
export const signup = () => {
  return async (dispatch, getState) => {
    try {
      //get user details with state
      const {email, password, firstname, lastname} = getState().user;
      //signup with firebase
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      //if signup returns no error
      if (response.user.uid != null) {
        //get user id with firebase created
        const user = {
          uid: response.user.uid,
          email: email,
          firstname: firstname,
          lastname: lastname,
          position: 'staff',
        };

        //save user details to firebase cloud
        db.collection('users')
          .doc(response.user.uid)
          .set(user);

        dispatch({type: SIGNUP, payload: user});
      }
    } catch (e) {
      Alert.alert(e);
    }
  };
};
//login method for firebase email auth
export const login = () => {
  return async (dispatch, getState) => {
    try {
      const email = getState().user.email;
      const password = getState().user.password;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password,
      );

      dispatch(getUser(response.user.uid));
    } catch (e) {
      Alert.alert(e);
    }
  };
};
//get user to determine if user is already logged in
export const getUser = uid => {
  return async (dispatch, getState) => {
    try {
      const user = await db
        .collection('users')
        .doc(uid)
        .get();

      dispatch({type: LOGIN, payload: user.data()});
    } catch (e) {
      Alert.alert(e);
    }
  };
};
