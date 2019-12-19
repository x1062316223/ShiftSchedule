//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {View, ScrollView} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {styles} from '../assets/styles';
import {db} from '../config/Firebase';

const list = [];

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list};
  }
  componentDidMount() {
    db.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var item = {
            name: doc.data().email,
            subtitle: doc.data().uid,
          };
          list.push(item);
          this.setState({list: list});
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  getDateMarking(day) {
    const {markedDates} = this.props;
    if (markedDates.length === 0) {
      return false;
    }
    const date = markedDates.find(item => moment(day).isSame(item.date, 'day'));
    if (date && date.dots.length > 0) {
      return date;
    } else {
      return false;
    }
  }
  //Detail Screen to show from any Open detail button
  render() {
    return (
      <View>
        <Header
          containerStyle={styles.header}
          centerComponent={{text: 'Schedule', style: {color: '#fff'}}}
        />

        <CalendarStrip
          onDateSelected={date =>
            this.props.navigation.navigate('Date', {
              thisdate: moment(date).format('YYYYMMDD'),
            })
          }
          calendarAnimation={{type: 'parallel', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          style={styles.calendar}
          iconContainer={{flex: 0.1}}
        />
        <ScrollView>
          {list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{source: {uri: l.avatar_url}}}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
              onPress={() => this.props.navigation.navigate('UserDetail')}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
