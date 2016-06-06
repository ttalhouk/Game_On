

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    textAlign: 'center',
  }

})

class Team extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {},
    }
  }

  back(){
    console.log(this.state)
  }


  renderTeam(team){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={() => this.goToTeamProfile(team)}>
          <Text style={styles.text}>{team.name}</Text>
        </TouchableHighlight>
      </View>
    )
  }

  goToTeamProfile(team) {
    // console.log("*********** props ****************")
    // console.log(this.props)
    // console.log("*********** state ****************")
    // console.log(this.state)
    this.props.navigator.push({
      name: 'team profile',
      passProps: team
    })
  }

  goToCreateTeamView() {
    this.props.navigator.push({
      name: "create team",
      passProps: this.state.userInfo,
    })
  }

  goToJoinTeamView() {
    this.props.navigator.push({
      name: "join team",
      passProps: this.state.userInfo,
    })
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo,
      dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.teams)
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <View>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>
      </View>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTeam.bind(this)}
      />

        <View style={styles.bottomContainer}>
          <TouchableHighlight onPress={this.goToCreateTeamView.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Create team
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.goToJoinTeamView.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Join team
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

module.exports = Team;
