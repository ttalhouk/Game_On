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
  ActivityIndicatorIOS,
  Image,
} from 'react-native';

class JoinTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {},
      loading: true
    }
  }

  getAllTeamList() {
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams', {
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
          errorMessages: response.errorMessages,

        })
      }else{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.team),
          loading: false
        });
      }
    });
  }

  sendJoinTeamRequest(teamID) {

    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+teamID+'/join', {
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
        this.setState({
          userInfo: response.player,

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
  }

  renderTeam(team){
    return (
      <View>
        <TouchableHighlight style={styles.button} onPress={() => this.sendJoinTeamRequest(team.id)}>
          <View>
            <Text style={styles.buttonText}>{team.name[0].toUpperCase() + team.name.substring(1)}</Text>
            <Text style={styles.teamInfo}>{team.city}</Text>
            <Text style={styles.teamInfo}>{team.zip_code}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderLoadingView() {
    return (
      <ActivityIndicatorIOS
      animating={this.state.animating}
      style={[styles.centering, {height:500}]}
      size="large"
    />
    )
  }

  render() {

    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../imgs/basketball_players_vectors_color.jpg')}>
        <View style={styles.teamBox}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderTeam.bind(this)}
          />
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
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor:'#E5E5E5',
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode:'contain',
  },
  buttonText: {
    fontSize: 36,
    fontWeight:'bold',
    color: '#005EFB',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FFA64C',
    borderColor: '#6600ff',
    borderRadius: 8,
    padding: 76,
    margin: 5,
    opacity:.95,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  teamBox:{
    flex:1,
    justifyContent:'flex-start'
  },
  teamInfo:{
    fontSize: 18,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'center'
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
