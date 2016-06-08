

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Navigator,
  TouchableHighlight,
  ListView,
  View,
  ActivityIndicatorIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const styles = require('../components/styling.js')

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {},
      loading: true
    }
  }


  getGamesList(){
    console.log()
    // takes the users input and tries to log them in
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team[0].id+'/games', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.player.games),
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  renderGame(game){
    game.home_team = game.home_team[0].toUpperCase() + game.home_team.substring(1);
    game.away_team = game.away_team[0].toUpperCase() + game.away_team.substring(1);

    return (
      <View style={[styles.innerWrapper, {backgroundColor:'#e5e5e5'}]}>

          <Text style={[styles.h1, styles.textCenter, {color: "red"}]}>{game.home_team} <Icon
          name="ios-basketball-outline"
          size={30}
          color="#FF7400"/>
              <Text style={[styles.h1, {color: "blue"}]}> {game.away_team}
            </Text>
          </Text>
          <Text style={[styles.h4, styles.textCenter]}>{game.start_time}</Text>
          <Text style={[styles.h5, styles.textCenter]}>{game.address}</Text>
          <Text style={[styles.h5, styles.textCenter]}>{game.city}, {game.zip_code}</Text>

      </View>
    )
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo,
    });
    this.getGamesList();
  }

  back(){
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
      <View style={[styles.container, {backgroundColor: '#3b82fc'}]}>
        <View style={styles.header}>
        <View style={[{flex: 1}, {flexDirection: "column"}]}>
          <Text style={[styles.p, styles.textCenter,{paddingTop: 20}]}>GAMES</Text>
          </View>
        </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGame}
      />
      </View>
    );
  }
}

module.exports = Game;
