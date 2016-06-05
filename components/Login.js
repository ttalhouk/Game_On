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
      email: "",
      password: "",
      errorMessages: "",
      userInfo: {

      }
    }
  }

  login(){
    // takes the users input and tries to log them in
    fetch('https://4aba915e.ngrok.io/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        // this is incorrect credentials
        this.setState({
          errorMessages: response.errorMessages
        })
      }else{
        this.setState({
          userInfo: response.player
        })
        this.props.navigator.push({
          name: 'home',
          passProps: this.state.userInfo
        })
      }
    })
  }

  back(){
    this.props.navigator.pop()
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
