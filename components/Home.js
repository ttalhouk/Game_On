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

import Team from './Team';
import Game from './Games';
import Rsvp from './Rsvp';
import Setting from './Settings';
import Icon from 'react-native-vector-icons/Ionicons';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      selectedTab: 'team',
      userInfo: {

      }
    }
  }
  componentDidMount(){
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="gray"
        tintColor="blue"
        barTintColor="lightgray"
        selectedTab={this.state.selectedTab}>
          <Icon.TabBarItemIOS
            iconName="ios-people-outline"
            selectedIconName="ios-people"
            title="Team"
            selected={this.state.selectedTab === 'team'}
            onPress={() => {
              this.setState({
                selectedTab: 'team',
              });
            }}>
          <Team navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'games'}
          iconName="ios-basketball-outline"
          selectedIconName="ios-basketball"
          title="Games"
          onPress={() => {
            this.setState({
              selectedTab: 'games',
            });
          }}>
          <Game navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'rsvp'}
          iconName="ios-mail-outline"
          selectedIconName="ios-mail"
          title="RSVP"
          onPress={() => {
            this.setState({
              selectedTab: 'rsvp',
            });
          }}>
          <Rsvp navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'settings'}
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          title="Settings"
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          <Setting navigator={this.props.navigator} userInfo={this.props.userInfo}/>
        </Icon.TabBarItemIOS>
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
