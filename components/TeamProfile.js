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

  back(){
    this.props.navigator.pop();
  }

  renderRoster(player) {
    return (
      <View>
      <Text style={styles.text}>{player}</Text>
      </View>
    )
 }

 log(){
   console.log(this.props)
 }

  render() {
    var roster = this.state.userInfo.roster;
    if (this.state.userInfo.team && !this.state.userInfo.isManager) {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Team Profile</Text>
      </View>
      <Image
          source={require('../imgs/Burning_Basketball.jpg')}
          style={[styles.backgroundImage, {resizeMode: "cover"}]}>
          <View>
            <Text style={styles.description}>{this.state.userInfo.team.name}</Text>
            <Text style={styles.text}>City: {this.state.userInfo.team.city}, Zip code: {this.state.userInfo.team.zip_code}</Text>
            <Text style={styles.text}>Manager: {this.state.userInfo.manager.name}</Text>
            <Text style={styles.text}>Roster: </Text>
            </View>
            <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRoster.bind(this)} />
              </View>
              </Image>
      </View>
  )} else if (this.state.userInfo.team && this.state.userInfo.isManager) {
    return (

  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Team Profile</Text>
    </View>
    <View style={[styles.container, {flexDirection: "row"}]}>
      <View style={{flex: 1}}>
        <TouchableHighlight style={[styles.button,styles.teamProfileButtons, {backgroundColor: "blue"}]} onPress={this.goToScheduleGame.bind(this)}>
          <Text style={styles.buttonText}>Make Game</Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: 1}}>
        <TouchableHighlight style={[styles.button,styles.teamProfileButtons, {backgroundColor: "orange"}]} onPress={this.goToPendingGame.bind(this)}>
          <Text style={styles.buttonText}>Play Games</Text>
        </TouchableHighlight>
      </View>
    </View>
    <Image
      source={require('../imgs/Burning_Basketball.jpg')}
      style={[styles.backgroundImage, {resizeMode: "cover"}]}>
      <View>
      <Text style={styles.description}>{this.state.userInfo.team.name}</Text>
      <Text style={styles.text}>City: {this.state.userInfo.team.city}, Zip code: {this.state.userInfo.team.zip_code}</Text>
      <Text style={styles.text}>Manager: {this.state.userInfo.manager.name}</Text>
      <Text style={styles.text}>Roster: </Text>
      </View>
    <View>
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRoster.bind(this)} />
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
