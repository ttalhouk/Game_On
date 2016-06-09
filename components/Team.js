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
      <View>
          <TouchableHighlight style={styles.button} onPress={this.goToTeamProfile.bind(this, team)}>
            <Text style={styles.buttonText}>{team.name}</Text>
          </TouchableHighlight>
      </View>
    )
  }

  goToTeamProfile(team) {
    this.props.navigator.push({
      name: 'team profile',
      passProps: this.props.userInfo,
      clickedTeam: team
    })
  }

  goToCreateTeamView() {
    this.props.navigator.push({
      name: "create team",
      passProps: this.props.userInfo,
    })
  }

  goToJoinTeamView() {
    this.props.navigator.push({
      name: "join team",
      passProps: this.props.userInfo,
    })
  }

  componentWillMount(){
    if (this.props.userInfo.team.length != 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
      });
    }

  }


  render() {

    let playerHasTeam = (this.props.userInfo.team.length == 0) ?

    <TouchableHighlight onPress={this.goToJoinTeamView.bind(this)} style={styles.button}>
      <Text style={styles.buttonText}>
        Join a team!
      </Text>
    </TouchableHighlight>
    :
    <ListView
    dataSource={this.state.dataSource}
    renderRow={this.renderTeam.bind(this)}
    style={styles.list}
          />

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Your Teams
        </Text>


        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <TouchableHighlight onPress={this.goToCreateTeamView.bind(this)} style={styles.createJoinButton}>
              <Text style={styles.joinButtonText}>
                Create team
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.rightContainer}>
            <TouchableHighlight onPress={this.goToJoinTeamView.bind(this)} style={styles.createJoinButton}>
              <Text style={styles.joinButtonText}>
                Join team
              </Text>
            </TouchableHighlight>
            </View>
        </View>

        <View style={styles.teamBox}>
          {playerHasTeam}
        </View>


      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#FFA64C',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 76,
    margin: 5
  },
  topContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFA64C',
    flexDirection:'row',
    padding:10
  },
  container: {
    flex: 1,
    backgroundColor:'#E5E5E5'
  },
  createJoinButton: {
    backgroundColor: '#005EFB',
    borderRadius: 8,
    padding:10
  },
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  joinButtonText:{
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  // list: {
  //   height: 100
  // },
  leftContainer: {
    flex:1,
    marginRight:5,
    justifyContent:'center',
    justifyContent:'space-around'
  },
  rightContainer: {
    flex:1,
    marginLeft:5,
    justifyContent:'center',
    justifyContent:'space-around'

  },
  teamBox:{
    flex:1,
    justifyContent:'flex-start'
  },
  welcome: {
    fontSize: 18,
    paddingTop:20,
    padding:5,
    color: 'black',
    textAlign: 'center',
    backgroundColor:'#D3D3D3',
    fontWeight:'bold'
  }
})

module.exports = Team;
