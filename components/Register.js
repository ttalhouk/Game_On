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
class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      email: "",
      password: "",
      name: "",
      phone: "",
      zip_code: "",
      city: "",
      errorMessages: "",
      userInfo: {

      }
    }
  }

  createAccount(){
    // takes the users input and tries to log them in
    fetch('https://4aba915e.ngrok.io/players/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          phone: this.state.phone,
          zip_code: this.state.zip_code,
          city: this.state.city,
        }
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

  render() {
    return (
      <View style={styles.container}>
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

      <TextInput
        style={styles.input}
        placeholder='Confirm Password:'
        secureTextEntry={true}
        onChangeText={(confirm_pw) => {this.setState({confirm_pw: confirm_pw})}}
      />

      <TextInput
        style={styles.input}
        placeholder='Name:'
        onChangeText={(name) => {this.setState({name: name})}}
      />

      <TextInput
        style={styles.input}
        placeholder='Phone:'
        onChangeText={(phone) => {this.setState({phone: phone})}}
      />

      <TextInput
        style={styles.input}
        placeholder='Zip Code:'
        onChangeText={(zip_code) => {this.setState({zip_code: zip_code})}}
      />

      <TextInput
        style={styles.input}
        placeholder='City:'
        onChangeText={(city) => {this.setState({city: city})}}
      />

      <TouchableHighlight onPress={this.createAccount.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Create Account
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
AppRegistry.registerComponent('Register', () => Register);
module.exports = Register;
