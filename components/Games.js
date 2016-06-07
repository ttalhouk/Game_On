

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
  separator: {
  height: 1,
  backgroundColor: '#CCCCCC',
  flexDirection: 'row',
  alignSelf: 'stretch',
},
});
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
    // takes the users input and tries to log them in
    fetch('https://97bf7fcb.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team[0].id+'/games', {
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
    return (
      <View style={styles.container}>
          <Text>{game.start_time}</Text>
          <Text>{game.home_team} vs {game.away_team}</Text>
          <Text>{game.address}</Text>
          <Text>{game.city}, {game.zip_code}</Text>
          <View style={styles.separator}></View>
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

  renderLoadingView() {
    return (
      <View style={styles.container}>
          <Text>LOADING!</Text>
      </View>
    )
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

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
