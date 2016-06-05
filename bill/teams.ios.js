'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

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
    backgroundColor: 'blue',
  }
})

class Team extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Teams Page!
        </Text>
      </View>
    );
  }
}

module.exports = Team;
