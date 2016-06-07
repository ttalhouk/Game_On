import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
class Root extends Component {

  register(){
    this.props.navigator.push({
      name: 'register'
    })
  }

  login(){
    this.props.navigator.push({
      name: 'login'
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <Image
          source={require('../spencer/Kentucky_text.gif')}
          style={styles.formatImage}>
        <View>
          <Text style={styles.welcome}>
            GameOn!
          </Text>
          </View>
          <View style={styles.center}>
            <TouchableHighlight onPress={this.login.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Log In
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.register.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Register
              </Text>
            </TouchableHighlight>
          </View>
            <View style={styles.footer}>
            </View>
          </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formatImage:{
    flex: 1,
    width: null,
    height: null,
    marginTop:20
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding:5
  },
  buttonText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
    alignSelf: 'center'
  },
  center: {
    flex:1,
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  footer:{
    height:50,
    alignSelf:'stretch',
    backgroundColor:'#005EFB'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 45,
    padding:10,
    textAlign: 'center',
    backgroundColor:'#005EFB',
    fontWeight:'bold', 
    color: 'white',
  },
});
module.exports = Root;
AppRegistry.registerComponent('Root', () => Root);
