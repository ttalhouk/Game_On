import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ActivityIndicatorIOS,
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
  nav: {
    marginTop: 20,
    backgroundColor: 'blue',
    height: 40,
  }
})

class PendingGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {},
      loading: true,
    }
  }

  back(){
    this.props.navigator.pop();
  }

  challengeTeam(game) {
    fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team.id+'/games/'+game.game_id+'/challenge', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        console.log(response)
          this.setState({
            errorMessages: response.errorMessages
        })
      }else{
        console.log(response);
      }
      this.back();
    })
  }

  componentWillMount(){
    this.getPendingGame();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
    });
  }

  getPendingGame() {

    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team.id+'/play', {

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
          gameInfo: response.games,
          dataSource: this.state.dataSource.cloneWithRows(response.games),
          loading: false,
        });
      }
    });
  }

  renderGame(game){
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.challengeTeam.bind(this, game)}>
          <Text style={styles.buttonText}>{game.home_team.name}</Text>
        </TouchableHighlight>
        <View>
          <Text style={styles.text}>Address: {game.address}</Text>
          <Text style={styles.text}>City: {game.city}, Zip code: {game.zip_code}</Text>
          <Text style={styles.text}>Game time: {game.start_time}</Text>
        </View>
      </View>
    )
  }

  renderLoadingView() {
    return (
      <ActivityIndicatorIOS
        animating={this.state.animating}
        style={[styles.centering, {height: 500}]}
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
        <View style={styles.nav}>
          <Text style={styles.text}>Challenge a team</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGame.bind(this)}
        />
      </View>
    )
  }


}

module.exports = PendingGame;
