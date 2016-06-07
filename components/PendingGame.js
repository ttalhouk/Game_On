import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  ListView,
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

  componentWillMount(){
    this.getPendingGame();
    // console.log("*********** this props in componentWillMount ***************")
    // console.log(this.props)
    this.setState({
      // userInfo: this.props.userInfo,
      dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
    });
  }

  getPendingGame() {
    // console.log("*********** this props in getPendingGame ***************")
    // console.log(this.props)

    console.log("*********** this state in getPendingGame ***************")
    console.log(this.state)

    fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team.id+'/play', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      console.log("************* response from fetch *****************")
      console.log(response)

      if (response.error) {
        // this is incorrect credentials
        this.setState({
          errorMessages: response.errorMessages
        })
      }else{
        this.setState({
          userInfo: response.player,
          dataSource: this.state.dataSource.cloneWithRows(response.games),
          loading: false,
        });
      }
    });
  }

  renderTeam(game){
    console.log("************* this state *****************")
    console.log(this.state)
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>{game.home_team.name}</Text>
        </TouchableHighlight>
        <View style={styles.welcome}>
          <Text>Address: {game.address}</Text>
          <Text>City: {game.city}, Zip code: {game.zip_code}</Text>
          <Text>Game time: {game.start_time}</Text>
        </View>
      </View>
    )
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
        <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderTeam.bind(this)}
        />
        </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>Join Pending Game</Text>
        </View>
      </View>
    )
  }


}

module.exports = PendingGame;
