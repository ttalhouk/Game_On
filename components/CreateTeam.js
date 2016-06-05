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
      userInfo: {

      }
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
          placeholder='Email:'
          onChangeText={(email) => {this.setState({email: email})}}
          keyboardType='email-address'
        />


      <TextInput
        style={styles.input}
        placeholder='Password:'
        secureTextEntry={true}
        onChangeText={(pw) => {this.setState({password: pw})}}
      />
      <TouchableHighlight onPress={this.login.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Log In
        </Text>
      </TouchableHighlight>
    </View>
    );
  }
}
