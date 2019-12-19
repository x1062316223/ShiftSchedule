//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {View, StyleSheet, Platform, Alert, Button} from 'react-native';
import {Header} from 'react-native-elements';
import {db} from '../config/Firebase';
import {items} from '../assets/employeeList';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {connect} from 'react-redux';

const list = [];

class DateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      thisdate: this.props.navigation.state.params.thisdate,
    };
    this.state = {list};
  }
  componentDidMount = () => {
    db.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var item = {
            name: doc.data().email,
            id: doc.data().uid,
          };
          items.map(obj => {
            obj.children.push(item);
          });
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  saveSchedule = () => {
    this.state.selectedItems.map(value => {
      items.map(obj => {
        obj.children.map(item => {
          if (item.id === value) {
            //save job to database
            //get current date
            //create object of job done
            const jobDone = {
              checkedBy: this.props.user.email,
              date: this.props.navigation.state.params.thisdate,
            };
            db.collection('Schedule')
              .doc()
              .set(jobDone);
            Alert.alert('You have successfully checked');
          }
        });
      });
    });
  };
  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  render() {
    return (
      <View>
        <Header
          containerStyle={styles.header}
          centerComponent={{
            text:
              'Assign Employee' +
              '/' +
              this.props.navigation.state.params.thisdate,
            style: {color: '#fff'},
          }}
          leftComponent={{
            text: 'Back',
            style: {color: '#fff'},
            onPress: () => this.props.navigation.goBack(),
          }}
        />
        <SectionedMultiSelect
          //space for notch in iPhone
          {...Platform.select({
            ios: {modalWithSafeAreaView: true},
          })}
          modalWithTouchable={true}
          hideSearch={true}
          items={items}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          showRemoveAll={true}
        />
        <Button title="Submit" onPress={this.saveSchedule} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      android: {height: 56, paddingTop: 0},
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(DateSchedule);
