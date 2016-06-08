

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  Image,
  Navigator,
  TouchableHighlight,
  ListView,
  View
} from 'react-native';

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
      console.log(response)
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
      <View style={styles.gameContainer}>
        <View style={styles.formatGameInfo}>
          <Text style={styles.gameInfo}>{game.start_time}</Text>
          <Text style={styles.gameInfo}>{game.home_team} vs {game.away_team}</Text>
          <Text style={styles.gameInfo}>{game.address}</Text>
          <Text style={styles.gameInfo}>{game.city}, {game.zip_code}</Text>
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

  renderLoadingView() {
    return (
      <Image
          source={require('../spencer/basketball.gif')}
          style={styles.formatImage}>
        <View style={styles.loadingContainer}>
            <Text>LOADING!</Text>
        </View>
      </Image>
    )
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Game Schedule
        </Text>

        <ListView
          style= {styles.scroll}
          dataSource={this.state.dataSource}
          renderRow={this.renderGame}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  formatImage:{
    flex: 1,
    width: null,
    height: null,
    marginTop:20
  },
  gameContainer: {
    marginBottom:10,
    backgroundColor:'#005EFB',
    borderRadius:5,
    padding:13
  },
  gameInfo: {
    alignItems: 'center',
    textAlign:'center',
    fontWeight:'bold'
  },
  formatGameInfo: {
    alignItems:'center'
  },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scroll:{
    flex:1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  welcome: {
    fontSize: 45,
    padding:10,
    marginTop:20,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor:'#005EFB',
    fontWeight:'bold',
    color:'white'
  }
});

module.exports = Game;
