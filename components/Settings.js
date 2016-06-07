
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
    color: 'black',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
})

class Setting extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: {

      }
    }
  }

  log(){
    console.log(this.state)
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.log.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Settings
        </Text>
      </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Setting;
