import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ListView,
  TabBarIOS
} from 'react-native';

import Team from './Teams';
import Game from './Games';
import Rsvp from './Rsvp';
import Setting from './Settings';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      selectedTab: 'teams',
      userInfo: {

      }
    }
  }
  componentDidMount(){
    console.log(this.props)
  }



  render() {
    console.log(this.props)
    return (
      <TabBarIOS
        unselectedTintColor="gray"
        tintColor="blue"
        barTintColor="lightgray"
        selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            icon={require('../imgs/home4-s.png')}
            style={styles.icon}
            renderAsOriginal
            title="Teams"
            selected={this.state.selectedTab === 'teams'}
            onPress={() => {
              this.setState({
                selectedTab: 'teams',
              });
            }}>
          <Team navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'games'}
          icon={require('../imgs/games4.png')}
          style={styles.icon}
          renderAsOriginal
          title="Games"
          onPress={() => {
            this.setState({
              selectedTab: 'games',
            });
          }}>
          <Game navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'rsvp'}
          icon={require('../imgs/rsvp2.png')}
          style={styles.icon}
          renderAsOriginal
          title="RSVP"
          onPress={() => {
            this.setState({
              selectedTab: 'rsvp',
            });
          }}>
          <Rsvp navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'settings'}
          icon={require('../imgs/settings2.png')}
          style={styles.icon}
          renderAsOriginal
          title="Settings"
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <Setting navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </TabBarIOS.Item>
      </TabBarIOS>
      )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
module.exports = Home;
AppRegistry.registerComponent('Home', () => Home);
