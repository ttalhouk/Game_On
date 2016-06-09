import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';

import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import CreateTeam from './components/CreateTeam';
import ScheduleGame from './components/ScheduleGame';
import JoinTeam from './components/JoinTeam';
import TeamProfile from './components/TeamProfile';
import PendingGame from './components/PendingGame';
import Chat from './components/Chat';

GLOBAL = require('./utils/globals');



class GameOn extends Component {

  renderScene(route, navigator){
    if (route.name == "login") {
      return <Login navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == "home") {
      return <Home navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == "register") {
      return <Register navigator={navigator} />
    }
    if (route.name == "create team") {
      return <CreateTeam navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == "join team") {
      return <JoinTeam navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == 'schedule game') {
      return <ScheduleGame navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == 'team profile') {
      return <TeamProfile navigator={navigator} userInfo={route.passProps} clickedTeam={route.clickedTeam} />
    }
    if (route.name == 'pending game') {
      return <PendingGame navigator={navigator} userInfo={route.passProps} />
    }
    if (route.name == 'chat') {
        return <Chat navigator={navigator} userInfo={route.passProps} clickedTeam={route.clickedTeam} />
    }


  }

  render() {

    return (
    <Navigator
      initialRoute={{ name: 'login' }}
      renderScene = { this.renderScene.bind(this) }
      navigationBar = {
        <Navigator.NavigationBar
           style={ styles.nav }
        routeMapper={NavigationBarRouteMapper}/>}
    />
    );
  }
}
var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 1) {
      return (
        <TouchableHighlight
        underlayColor="transparent"
        onPress={() => { if (index > 0) { navigator.pop() } }}>
        <Image style={styles.backBtn} source={require('./imgs/back.png')} />
        </TouchableHighlight>
      )}
      else { return null }
    },
    RightButton(route, navigator, index, navState) {
      if (route.onPress)
        return (
          <TouchableHighlight
              onPress={ () => route.onPress() }>
              <Text style={ styles.navBarRightButton }>
                    { route.rightText || 'Right Button' }
              </Text>
            </TouchableHighlight> )
    },
    Title(route, navigator, index, navState) {
      return <Text style={ styles.title }>{route.name[0].toUpperCase() + route.name.substring(1)}</Text>
    }
  };



const styles = StyleSheet.create({
  chat: {

  },
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
  backBtn:{
    marginTop:8,
    marginLeft:10,
    height:15
  },
  nav:{
    flex:1,
    height:50,
    backgroundColor:'#D3D3D3'
  },
  leftNavButtonText:{
    fontWeight:'bold',
    fontSize: 12,
  },
  title:{
    marginTop: 4,
    fontWeight:'bold',
    fontSize: 16,
    justifyContent:'space-around'
  },

});

AppRegistry.registerComponent('GameOn', () => GameOn);
