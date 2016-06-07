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
    fetch('https://97bf7fcb.ngrok.io/login/', {
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
        <Image
            source={require('../spencer/Kentucky_text.gif')}
            style={styles.backgroundImage}>
            <Text style={styles.welcome}>
              GameOn!
            </Text>
              <Text style={{color: 'red', alignItems:'flex-end', alignSelf:'stretch'}}>
                {this.state.errorMessages }
              </Text>
            <View style={styles.center}>

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
                <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>
                    Back
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
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    marginTop:20
  },
  button: {
    height: 40,
    backgroundColor: 'blue',
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: "blue"
  },
  welcome: {
    fontSize: 45,
    padding:10,
    textAlign: 'center',
    backgroundColor:'#005EFB',
    fontWeight:'bold',
    color: 'white'
  },
});
AppRegistry.registerComponent('Login', () => Login);
module.exports = Login;
