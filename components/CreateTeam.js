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

class CreateTeam extends Component {
  constructor(props){
    super(props)
    this.state = {
      teamName: "",
      sport = "",
      city = "",
      zip = "",
      userInfo: {},
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>

      <Text style={{color: 'red'}}>
        {this.state.errorMessages }
      </Text>

        <TextInput
          style={styles.input}
          placeholder='Team name:'
          onChangeText={(teamName) => {this.setState({teamName: teamName})}}
        />

        <TextInput
          style={styles.input}
          placeholder='Sport:'
          onChangeText={(sport) => {this.setState({sport: sport})}}
        />

        <TextInput
          style={styles.input}
          placeholder='City:'
          onChangeText={(city) => {this.setState({city: city})}}
        />

      <TextInput
        style={styles.input}
        placeholder='Zip code:'
        onChangeText={(zip) => {this.setState({zip: zip})}}
      />

      <TouchableHighlight onPress={this.createTeam.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Create team
        </Text>
      </TouchableHighlight>
    </View>
    );
  }
}

module.exports = CreateTeam;
