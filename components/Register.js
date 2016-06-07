import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
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
    fetch(GLOBAL.ngrok+'/players/', {
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
        console.log(response)
        this.setState({
          errorMessages: response.errorMessages
        })
      }else{
        console.log(response)
        console.log(this.props.navigator)
        this.props.navigator.push({
          name: 'home',
          passProps: response.player
        })
      }
    })
    .catch((error) => {
      console.warn(error);
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

      <Text style={{color: 'red'}}>
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
    backgroundColor: '#005EFB',
    borderColor: '#005EFB',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  center: {
    flex:1,
    justifyContent: 'flex-end'
  },
  footer:{
    height:50,
    alignSelf:'stretch',
    backgroundColor:'#005EFB'
    // justifyContent:'flex-end'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    // color: 'white',
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
    fontWeight:'bold'
  },
});
AppRegistry.registerComponent('Register', () => Register);
module.exports = Register;
