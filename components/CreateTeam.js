
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
  TouchableHighlight,
  TextInput
} from 'react-native';

class CreateTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      // sport: "",
      city: "",
      zip_code: "",
      userInfo: {},
    }
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo,
    });
  }

  createTeam() {
    if (!this.state.name || !this.state.city || !this.state.zip_code) {
      this.setState({
        errorMessages: "Missing information"
      })
    } else {
      fetch('https://97bf7fcb.ngrok.io/players/'+this.props.userInfo.info.id+'/teams', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: {
            name: this.state.name,
            // sport: this.state.sport,
            city: this.state.city,
            zip_code: this.state.zip_code,
          }
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.error) {
          // this is incorrect credentials
          this.setState({
            errorMessages: response.errorMessages
          })
        }else{
          this.props.navigator.push({
            name: 'home',
            passProps: response.player
          })
        }
      })
    }
  }

  back(){
    this.props.navigator.pop();
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
          placeholder='Team name:'
          onChangeText={(name) => {this.setState({name: name})}}
        />

        <TextInput
          style={styles.input}
          placeholder='City:'
          onChangeText={(city) => {this.setState({city: city})}}
        />

      <TextInput
        style={styles.input}
        placeholder='Zip code:'
        onChangeText={(zip_code) => {this.setState({zip_code: zip_code})}}
      />

      <TouchableHighlight onPress={this.createTeam.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Create team
        </Text>
      </TouchableHighlight>
    </View>
    );
  }
}

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
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#005EFB',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  downContainer: {
    flex: 1,
    bottom: 0,

  }
})

module.exports = CreateTeam;
