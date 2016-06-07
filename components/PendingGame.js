import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 5
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
  downButton: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
})

class PendingGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
    }
  }

  back(){
    this.props.navigator.pop();
  }

  componentWillMount(){

  }

  getPendingGame() {
    fetch('https://97bf7fcb.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.teams[0].id+'/play', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
        this.setState({
          userInfo: response.player
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Join Pending Game</Text>
      </View>
    )
  }


}

module.exports = PendingGame;
