'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Navigator,
  TouchableHighlight,
  ListView,
  View
} from 'react-native';

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
    backgroundColor: 'green',
  }
})

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {

      }
    }
  }


  getGamesList(){
    // takes the users input and tries to log them in

    fetch('https://1bc113a3.ngrok.io/players/'+this.props.userInfo.info.id+'/games', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.player.games)
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  renderGame(game){
    return (
      <View style={styles.container}>
        <View>
          <Text>{game.start_time}</Text>
          <Text>{game.home_team} vs {game.away_team}</Text>
          <Text>{game.address}</Text>
          <Text>{game.city}, {game.zip_code}</Text>
        </View>
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
    console.log(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.back.bind(this)} style={styles.button}>

        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableHighlight>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderGame}
      />
      </View>
    );
  }
}

module.exports = Game;
