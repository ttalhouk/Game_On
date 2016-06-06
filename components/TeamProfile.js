import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  downButton: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  text: {
    textAlign: 'center',
  }
})

class TeamProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: {},
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Team Profile</Text>
        <View style={styles.separator}></View>
      </View>
  )}


}

module.exports = TeamProfile;
