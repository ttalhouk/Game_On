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

class TeamProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
    }
  }

  getTeamProfile() {
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team[0].id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {

        // this is incorrect credentials
        this.setState({
          errorMessages: response.errorMessages
        })
      }else{
        console.log(response)
        this.setState({
          userInfo: response.player
        });
      }
    });
  }

  componentWillMount(){
    this.getTeamProfile();
  }

  goToScheduleGame(){
    this.props.navigator.push({
      name: 'schedule game',
      passProps: this.state.userInfo
    });
  }

  goToPendingGame(){
    this.props.navigator.push({
      name: 'pending game',
      passProps: this.state.userInfo
    });
  }

  back(){
    this.props.navigator.pop();
  }

  log(){
    // console.log("*********** this props ***************")
    // console.log(this.props)
    //
    // console.log("*********** user info ***************")
    // console.log(this.props.userInfo)
    //
    // console.log("*********** team id  ***************")
    // console.log(this.props.userInfo.teams[0].id)
    //
    // console.log("*********** state ***************")
    // console.log(this.state.userInfo.team)
    // console.log(this.state.userInfo.team.name)
  }

  render() {
    var roster = this.state.userInfo.roster;
    if (this.state.userInfo.team && !this.state.userInfo.isManager) {
    return (
      <View style={styles.container}>
      <View>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>
      </View>
            <Text style={styles.description}>{this.state.userInfo.team.name}</Text>
            <Text style={styles.text}>City: {this.state.userInfo.team.city}, Zip code: {this.state.userInfo.team.zip_code}</Text>
            <Text style={styles.text}>Manager: {this.state.userInfo.manager.name}</Text>
            <Text style={styles.text}>Roster: </Text>
            {roster.map(function(player) {
              return <Text key={roster.indexOf(player)} style={styles.text}>{roster.indexOf(player)+ 1}: {player}</Text>
            })}
      </View>
  )} else if (this.state.userInfo.team && this.state.userInfo.isManager) {
    return (
      <View style={styles.container}>
      <View>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>
      </View>
          <Text style={styles.description}>{this.state.userInfo.team.name}</Text>
          <Text style={styles.text}>City: {this.state.userInfo.team.city}, Zip code: {this.state.userInfo.team.zip_code}</Text>
          <Text style={styles.text}>Manager: {this.state.userInfo.manager.name}</Text>
          <Text style={styles.text}>Roster: </Text>
          {roster.map(function(player) {
            return <Text key={roster.indexOf(player)} style={styles.text}>{roster.indexOf(player)+ 1}: {player}</Text>
          })}
          <TouchableHighlight style={styles.button} onPress={this.goToScheduleGame.bind(this)}>
            <Text style={styles.buttonText}>Make Game</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.goToPendingGame.bind(this)}>
            <Text style={styles.buttonText}>Join Game</Text>
          </TouchableHighlight>
      </View>
  )} else {
    return (
      <Text>loading...</Text>
    )
  }
}

}

module.exports = TeamProfile;
