'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TabBarIOS,
  TouchableOpacity,
  Image,
  PanResponder,
} from 'react-native';

var Team = require('./teams.ios');
var Game = require('./games.ios');
var Rsvp = require('./components/rsvp.ios');
var Setting = require('./settings.ios');
var ScrollableTabView = require('react-native-scrollable-tab-view');


class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'teams'
    };
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="gray"
        tintColor="blue"
        barTintColor="lightgray"
        selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            icon={require('./imgs/home4-s.png')}
            style={styles.icon}
            renderAsOriginal
            title="Teams"
            selected={this.state.selectedTab === 'teams'}
              onPress={() => {
                this.setState({
                  selectedTab: 'teams',
                });
              }}>
          <Team/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            selected={this.state.selectedTab === 'games'}
          // icon={{uri:'contacts'}}
          //  systemIcon="most-viewed"
            icon={require('./imgs/games4.png')}
            style={styles.icon}
            renderAsOriginal
            title="Games"
            onPress={() => {
              this.setState({
                selectedTab: 'games',
              });
            }}>
            <Game/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            selected={this.state.selectedTab === 'rsvp'}
            // icon={{uri:'contacts'}}
            icon={require('./imgs/rsvp2.png')}
            style={styles.icon}
            renderAsOriginal
            title="RSVP"
            onPress={() => {
              this.setState({
                selectedTab: 'rsvp',
              });
            }}>
            <Rsvp/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            selected={this.state.selectedTab === 'settings'}
            // icon={{uri:'contacts'}}
            icon={require('./imgs/settings2.png')}
            style={styles.icon}
            renderAsOriginal
            title="Settings"
            onPress={() => {
              this.setState({
                selectedTab: 'settings',
              });
            }}>
            <Setting/>
          </TabBarIOS.Item>
        </TabBarIOS>
    )
  }
}
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  icon: {
    flex: 1,
  }
});

AppRegistry.registerComponent('TabBar', () => TabBar);
