import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput
} from 'react-native';
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username: ""
    }
  }

  onSubmit(){
    console.log(this.props)

    this.props.navigator.push({
      name: 'home',
      passProps: {
        username: this.state.username
      }
  })
  }

  render() {
    return (
      <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder='Username:'
        onChangeText={(text) => {this.setState({username: text})}}
      />
      <TextInput
        style={styles.input}
        placeholder='Password:'
        secureTextEntry={true}
      />
      <TouchableHighlight onPress={this.onSubmit.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Log In
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
  button: {
    height: 40,
    backgroundColor: 'blue',

  },
  text: {
    color: "blue"
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    color: 'white',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('Login', () => Login);
module.exports = Login;
