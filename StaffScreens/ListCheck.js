import React from 'react';
//import react in our code.
import {View, Alert, FlatList, Text, TouchableOpacity} from 'react-native';
//import all the basic component we have used
import {Header, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {db} from '../config/Firebase';
import firebase from 'firebase';

import moment from 'moment';
//import list items
import {items} from '../assets/checklist';
//import job list styles
import {stylesCheck} from '../assets/styles';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

class ListCheck extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon name="clipboard-check" size={22} />,
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      location: null,
    };
  }

  componentDidMount() {
    this.checkCheckIn();
    this.fetchData();
    // Instead of navigator.geolocation, just use Geolocation.
    Geolocation.getCurrentPosition(
      position => {
        const location = new firebase.firestore.GeoPoint(
          position.coords.latitude,
          position.coords.longitude,
        );

        console.log(location);
        this.setState({location});
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
  }
  //get job list
  fetchData = () => {
    items.map(item => {
      item.isSelect = false;
      item.selectedClass = stylesCheck.list;

      return item;
    });

    this.setState({
      loading: false,
      dataSource: items,
    });
  };
  //save job done to firebase
  saveCheckList = () => {
    this.state.dataSource.map(value => {
      if (value.isSelect !== false) {
        //save job to database
        //get current date
        var date = moment().format('YYYYMMDD');
        const job = value.name;
        //create object of job done
        const jobDone = {
          checkedBy: this.props.user.email,
          date: date,
        };
        db.collection('checkList')
          .doc(date + job)
          .set(jobDone);
        Alert.alert('You have successfully checked');
      }
    });
  };
  //check if user has checked in to display 'submit' button for job check list
  checkCheckIn = () => {
    db.collection('checkIn')
      .doc(moment().format('YYYYMMDD') + this.props.user.email)
      .onSnapshot(snapshot => {
        // these are both undefined
        if (snapshot.exists === true) {
          this.setState({checkin: false});
        } else if (snapshot.exists === false) {
          this.setState({checkin: true});
        }
      });
  };
  onClickCheckIn = () => {
    //let branchLocation = new firebase.firestore.GeoPoint();
    db.collection('branch')
      .doc('hampton')
      .get()
      .then(snapshot => {
        console.log('current ---' + this.state.location);
        console.log('db ---' + snapshot.data().location);
        if (this.state.location.isEqual(snapshot.data().location)) {
          this.checkin();
          console.log('checked in');
        } else {
          Alert.alert('You need to be in branch');
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    // if ((this.state.location = JSON.stringify(branchLocation))) {
    //   console.log(JSON.stringify(branchLocation));
    //   this.checkin();
    // } else {
    //   console.log(JSON.stringify(branchLocation));
    //   Alert.alert('You need to be in the branch');
    // }
  };

  //check in save to firebase enable submit button only on the day
  checkin = () => {
    var date = moment().format('YYYYMMDD');
    // Create a Firebase reference where GeoFire will store its information
    // Create a GeoFire index
    const checkIn = {
      Employee: this.props.user.email,
      time: moment().format('HHmm'),
    };
    db.collection('checkIn')
      .doc(date + this.props.user.email)
      .set(checkIn)
      .catch(error => {
        Alert.alert(error);
      });
    this.state.checkin = false;
    this.forceUpdate();
    Alert.alert('You have successfully checked-in');
  };

  FlatListItemSeparator = () => <View style={stylesCheck.line} />;

  //change color for select item
  selectItem = data => {
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect
      ? stylesCheck.selected
      : stylesCheck.list;

    const index = this.state.dataSource.findIndex(
      item => data.item.id === item.id,
    );
    this.state.dataSource[index] = data.item;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  //change the look of selected item
  renderItem = data => (
    <TouchableOpacity
      style={[stylesCheck.list, data.item.selectedClass]}
      onPress={() => this.selectItem(data)}>
      <Text style={stylesCheck.lightText}>
        {data.item.name.charAt(0).toUpperCase() + data.item.name.slice(1)}{' '}
      </Text>
    </TouchableOpacity>
  );

  //Detail Screen to show from any Open detail button
  render() {
    return (
      <View style={stylesCheck.View}>
        <Header
          containerStyle={stylesCheck.header}
          centerComponent={{text: 'Check List', style: {color: '#fff'}}}
          rightComponent={{
            text: 'Check in',
            onPress: this.onClickCheckIn,
          }}
        />
        <FlatList
          data={items}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.name.toString()}
          extraData={this.state}
        />
        <Button
          title="Submit"
          onPress={this.saveCheckList}
          disabled={this.state.checkin}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ListCheck);
