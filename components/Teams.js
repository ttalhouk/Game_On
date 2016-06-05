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
    backgroundColor: 'white',
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
