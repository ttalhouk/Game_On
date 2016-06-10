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

import Icon from 'react-native-vector-icons/Ionicons';
const styles = require('../components/styling.js')

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
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team.id+'/games/'+game.game_id+'/challenge', {
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
    game.home_team.name = game.home_team.name[0].toUpperCase() + game.home_team.name.substring(1);
    return (
      <View style={styles.innerWrapper}>
      <View>
        <TouchableHighlight underlayColor="transparent" onPress={this.challengeTeam.bind(this, game)}>
          <Text style={[styles.h1]}>{game.home_team.name}</Text>
        </TouchableHighlight>
        </View>
        <View>
        <Text style={[styles.h4]}>{game.start_time}</Text>
          <Text style={[styles.h5]}>{game.address}</Text>
          <Text style={[styles.h5]}>{game.city}, {game.zip_code}</Text>
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
        <View style={styles.header}>

          <Text style={[styles.headerText]}>Play Games</Text>

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
