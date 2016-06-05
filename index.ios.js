/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Login from './login';
import Home from './home';

class GameOn extends Component {

  renderScene(route, navigator){
    console.log("this.props log: ")
    console.log(this.props)
    console.log("router log: ")
    console.log(route)
    if (route.name == "login") {
      return <Login navigator={navigator} talal="that is his name!!!" userInfo={route.passProps} />
    }
    if (route.name == "home") {
      return <Home navigator={navigator} userInfo={route.passProps} />
    }

  }

  render() {
    return (
        <Navigator
          initialRoute={{name: 'login'}}
          renderScene={this.renderScene.bind(this)}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

AppRegistry.registerComponent('GameOn', () => GameOn);
