import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: this.props.userInfo.username
    }
    console.log("state home: ")
    console.log(this.state.username)
  }

  back(){
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Main
        </Text>
        <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableHighlight>
      </View>

    );
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
