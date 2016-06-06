import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight,
  TextInput
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
    backgroundColor: '#765432',
  }
})
class ScheduleGame extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInfo: {

      }
    }
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo
    })
  }

  log(){
    console.log(this.props)
  }

  back(){
    this.props.navigator.pop();
  }


  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.log.bind(this)} style={styles.button}>
        <Text>
          BUGS
        </Text>
      </TouchableHighlight>
      <Text>
        hello this is the right page, welcome stranger
      </Text>
      <TouchableHighlight onPress={this.back.bind(this)}>
        <Text>
          Back
        </Text>
      </TouchableHighlight>
      </View>
    )
  }
}
module.exports = ScheduleGame;
