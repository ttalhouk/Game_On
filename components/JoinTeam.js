import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Navigator,
} from 'react-native';

class JoinTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {},
    }
  }

  getAllTeamList() {
    fetch('https://97bf7fcb.ngrok.io/players/'+this.props.userInfo.info.id+'/teams', {
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
          dataSource: this.state.dataSource.cloneWithRows(response.team)
        });
      }
    });
  }

  sendJoinTeamRequest(teamID) {
    fetch('https://97bf7fcb.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+teamID+'/join', {
      method: 'PATCH',
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
        console.log("****routes****")
        console.log(this.props.navigator.getCurrentRoutes())

        this.setState({
          userInfo: response.player
        })
        this.props.navigator.push({
          name: 'home',
          passProps: this.state.userInfo,
          _navigatorRouteID: 2
        })
      }
    })
  }

  componentWillMount(){
    this.getAllTeamList();
  }

  back(){
    this.props.navigator.pop();
  }

  log() {
      console.log("********   state  **********")
    console.log(this.state)
      console.log("********  props  **********")
    console.log(this.props)
    console.log("****routes****")
    console.log(this.props.navigator.getCurrentRoutes())
  }

  renderTeam(team){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() => this.sendJoinTeamRequest(team.id)}>
          <Text style={styles.buttonText}>{team.name}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {

    return (
      <View>
        <View style={styles.container}>
          <Text> Join a team! </Text>

          <TouchableHighlight onPress={this.log.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Log!
            </Text>
          </TouchableHighlight>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderTeam.bind(this)}
          />

        </View>
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
    flexWrap: 'wrap',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
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

module.exports = JoinTeam;
