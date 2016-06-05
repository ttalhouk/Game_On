'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
})

class Team extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {

      }
    }
  }

  back(){
    console.log(this.state)
  }

  renderTeam(team){
    return (
      <View style={styles.container}>
        <View>
          <Text>{team.name}</Text>
        </View>
      </View>
    )
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo,
      dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.teams)
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTeam}
      />
      </View>
    );
  }

}

module.exports = Team;
