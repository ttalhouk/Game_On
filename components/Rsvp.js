'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
} from 'react-native';


class Rsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  render() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View>
        {numbers.map(function(num) {
          return (
            <View key={numbers.indexOf(num)}>
              <Text style={styles.text} key={numbers.indexOf(num)}>{num}</Text>
            </View>
          )
        })}
      </View>
    )}
}

var styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'green',
    fontSize: 25,
    textAlign: 'center'
  }
})

module.exports = Rsvp;
