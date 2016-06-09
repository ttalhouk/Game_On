import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  ListView,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class TeamProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  getTeamProfile() {
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.clickedTeam.id, {
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

        this.setState({
          userInfo: response.player,
          dataSource: this.state.dataSource.cloneWithRows(response.player.roster),
          loading: false,
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

  renderRoster(player) {
    return (
      <View>
      <Text style={styles.text}>{player}</Text>
      </View>
    )
 }

 log(){
   console.log("***********PROPS MOTHA FUCKA****************")
   console.log(this.props)
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
            <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRoster.bind(this)} />
              </View>
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
      <TouchableHighlight onPress={this.log.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          log
        </Text>
      </TouchableHighlight>
      </View>
          <Text style={styles.description}>{this.state.userInfo.team.name}</Text>
          <Text style={styles.text}>City: {this.state.userInfo.team.city}, Zip code: {this.state.userInfo.team.zip_code}</Text>
          <Text style={styles.text}>Manager: {this.state.userInfo.manager.name}</Text>
          <Text style={styles.text}>Roster: </Text>
          <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRoster.bind(this)} />
            </View>
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
module.exports = TeamProfile;
