//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {View, ScrollView, Alert} from 'react-native';
//import all the basic component we have used
import {Header, Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {db} from '../config/Firebase';
import moment from 'moment';
//import list items
import {items} from '../assets/checklist';
import {styles} from '../assets/styles';
import {connect} from 'react-redux';

const list = [];

class ListCheck extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon name="clipboard-check" size={22} />,
  };
  constructor() {
    super();
    this.state = {
      selectedItems: [],
    };
    this.state = {list};
  }

  getCheckedList() {
    db.collection('checkList')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //find doc with current date
          if (doc.id.substr(0, 8) === moment().format('YYYYMMDD')) {
            var item = {
              checkedBy: doc.data().checkedBy,
              job: doc.id.substr(8),
            };
            list.push(item);
            this.setState({list: list});
          }
        });
      })
      .catch(err => {
        Alert.alert('Error getting documents', err);
      });
  }
  componentDidMount() {
    this.getCheckedList();
  }

  saveCheckList = () => {
    this.state.selectedItems.map(value => {
      items.map(obj => {
        obj.children.map(item => {
          if (item.id === value) {
            //save job to database
            //get current date
            var date = moment().format('YYYYMMDDHHmm');
            //create object of job done
            const jobDone = {
              checkedBy: this.props.user.email,
              job: item.name,
              date: date,
            };
            db.collection('checkList')
              .doc()
              .set(jobDone);
            Alert.alert('You have successfully checked');
          }
        });
      });
    });
  };

  //Detail Screen to show from any Open detail button
  render() {
    return (
      <View style={styles.View}>
        <Header
          containerStyle={styles.header}
          centerComponent={{text: 'Check List', style: {color: '#fff'}}}
        />
        <ScrollView>
          {this.state.list.map((l, i) => (
            <ListItem
              key={i}
              title={l.job}
              rightSubtitle={l.checkedBy}
              bottomDivider
            />
          ))}
        </ScrollView>
        <Button title="Submit" onPress={this.saveCheckList} />
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
