
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
  TouchableHighlight,
  TextInput,
  Image
} from 'react-native';

class CreateTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
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
      fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: {
            name: this.state.name,
            city: this.state.city,
            zip_code: this.state.zip_code,
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
          this.props.navigator.push({
            name: 'home',
            passProps: response.player
          })
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../imgs/womans-team2.jpg')}>
          <View style={{flex:.8}}>
            <Text style={{color: 'red'}}>
              {this.state.errorMessages }
            </Text>

            <TextInput
              style={styles.input}
              placeholderTextColor = "silver"
              placeholder='Team name:'
              onChangeText={(name) => {this.setState({name: name})}}
            />

            <TextInput
              style={styles.input}
              placeholderTextColor = "silver"
              placeholder='City:'
              onChangeText={(city) => {this.setState({city: city})}}
            />

            <TextInput
              style={styles.input}
              placeholderTextColor = "silver"
              placeholder='Zip code:'
              onChangeText={(zip_code) => {this.setState({zip_code: zip_code})}}
            />
          </View>
          <View style={{flex:.2}}>
            <TouchableHighlight underlayColor="transparent" onPress={this.createTeam.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>
                Create Team
              </Text>
            </TouchableHighlight>
          </View>
      </Image>
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
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode:'contain',
  },
  container: {
    marginTop:50,
    flex: 1,
    backgroundColor:'#E5E5E5',
  },
  buttonText: {
    fontSize: 18,
    padding: 10,
    backgroundColor:"#005EFB",
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 8,
    marginBottom: 10,
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

  },

})

module.exports = CreateTeam;
