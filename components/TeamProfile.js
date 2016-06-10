import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  ListView,
  LayoutAnimation,
  Image,

} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const styles = require('../components/styling.js')

class TeamProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
    }
  }

  getTeamProfile() {
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.clickedTeam.id, {
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
          userInfo: response.player,
          dataSource: this.state.dataSource.cloneWithRows(response.player.roster),
          loading: false,
        });
      }
    });
  }

  componentWillMount(){
    this.getTeamProfile();
  }

  goToScheduleGame(){
    this.props.navigator.push({
      name: 'schedule game',
      passProps: this.state.userInfo
    });
  }

  goToPendingGame(){
    this.props.navigator.push({
      name: 'pending game',
      passProps: this.state.userInfo
    });
  }

  renderRoster(player) {
    return (
      <View>
      <Text style={[styles.h5, {color: "white"}]}>{player}</Text>
      </View>
    )
 }

  render() {
    var roster = this.state.userInfo.roster;
    if (this.state.userInfo.team && !this.state.userInfo.isManager) {
      this.state.userInfo.team.name = this.state.userInfo.team.name[0].toUpperCase() + this.state.userInfo.team.name.substring(1);

    return (

      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>

      <Image
          source={require('../imgs/burning_basketball_desaturate.jpg')}
          style={[styles.backgroundImage, {resizeMode: "cover"}]}>
          <View style={styles.teamProfileBox}>

            <Text style={[styles.h1, {fontSize: 70}]}>{this.state.userInfo.team.name}</Text>
            <Text style={[styles.h2, {color: "orange"}]}>{this.state.userInfo.team.city}, {this.state.userInfo.team.zip_code}</Text>
            <Text style={[styles.h3, {color: "white", fontWeight: "bold"}]}>Team Manager: <Text style={{fontWeight: "normal"}}>{this.state.userInfo.manager.name}</Text></Text>
            <Text style={[styles.h4, {fontWeight: "bold", color: "white"}]}>Roster: </Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRoster.bind(this)} />
              </View>
              </Image>

      </View>
  )} else if (this.state.userInfo.team && this.state.userInfo.isManager) {
    this.state.userInfo.team.name = this.state.userInfo.team.name[0].toUpperCase() + this.state.userInfo.team.name.substring(1);

    return (

  <View style={styles.container}>

  <Image
  source={require('../imgs/burning_basketball_desaturate.jpg')}
  style={[styles.backgroundImage, {resizeMode: "cover", flex: 1}]}>
      <View style={[styles.teamProfileBox]}>
      <Text style={[styles.h1, {fontSize: 60}]}>{this.state.userInfo.team.name}</Text>
      <Text style={[styles.h2, {color: "orange"}]}>{this.state.userInfo.team.city}, {this.state.userInfo.team.zip_code}</Text>
      <Text style={[styles.h3, {color: "white", fontWeight: "bold"}]}>Team Manager: <Text style={{fontWeight: "normal"}}>{this.state.userInfo.manager.name}</Text></Text>
      <Text style={[styles.h4, {fontWeight: "bold", color: "white"}]}>Roster: </Text>
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRoster.bind(this)} />
    </View>
    <View style={[{flexDirection: "row"}]}>
    <View style={{flex: 1}}>
    <TouchableHighlight style={[styles.button,styles.teamProfileButtons, {backgroundColor: "blue", marginTop: 0, marginBottom: 0}]} onPress={this.goToScheduleGame.bind(this)}>
    <Text style={styles.buttonText}>Make Game</Text>
    </TouchableHighlight>
    </View>
    <View style={{flex: 1}}>
    <TouchableHighlight style={[styles.button,styles.teamProfileButtons, {backgroundColor: "orange", marginTop: 0, marginBottom: 0}]} onPress={this.goToPendingGame.bind(this)}>
    <Text style={styles.buttonText}>Play Games</Text>
    </TouchableHighlight>
    </View>
    </View>
    </Image>
  </View>
  )} else {
    return (
      <Text>loading...</Text>
    )
  }
}

}

module.exports = TeamProfile;
