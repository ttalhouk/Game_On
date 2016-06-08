import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 TabBarIOS,
 Text,
 View,
 ListView,
 Navigator,
 TouchableHighlight
} from 'react-native';

class Team extends Component {
 constructor(props){
   super(props)
   this.state = {
     dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     }),
     userInfo: {},
   }
 }

 renderTeam(team){
   return (
     <View style={styles.container}>
         <TouchableHighlight style={styles.button} onPress={this.goToTeamProfile.bind(this, team)}>
           <Text style={styles.buttonText}>{team.name}</Text>
         </TouchableHighlight>
     </View>
   )
 }

 goToTeamProfile(team) {
   this.props.navigator.push({
     name: 'team profile',
     passProps: this.props.userInfo,
     clickedTeam: team
   })
 }

 goToCreateTeamView() {
   this.props.navigator.push({
     name: "create team",
     passProps: this.props.userInfo,
   })
 }

 goToJoinTeamView() {
   this.props.navigator.push({
     name: "join team",
     passProps: this.props.userInfo,
   })
 }

 componentWillMount(){
   if (this.props.userInfo.team.length != 0) {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
     });
   }

 }


 render() {

   let playerHasTeam = (this.props.userInfo.team.length == 0) ?

   <TouchableHighlight onPress={this.goToJoinTeamView.bind(this)} style={styles.button}>
     <Text style={styles.buttonText}>
       Join a team!
     </Text>
   </TouchableHighlight>
   :
   <ListView
   dataSource={this.state.dataSource}
   renderRow={this.renderTeam.bind(this)}
   style={styles.list}
         />

   return (
     <View style={styles.container}>
       <Text style={styles.welcome}>
         Your Teams
       </Text>

       {playerHasTeam}

       <View style={styles.bottomContainer}>
         <TouchableHighlight onPress={this.goToCreateTeamView.bind(this)} style={styles.button}>
           <Text style={styles.buttonText}>
             Create team
           </Text>
         </TouchableHighlight>

         <TouchableHighlight onPress={this.goToJoinTeamView.bind(this)} style={styles.button}>
           <Text style={styles.buttonText}>
             Join team
           </Text>
         </TouchableHighlight>
       </View>
     </View>
   );
 }

}

const styles = StyleSheet.create({
 buttonText: {
   fontSize: 18,
  //  color: 'white',
  color: 'black',
   alignSelf: 'center'
 },
 button: {
   height: 36,
   borderRadius: 8,
   marginTop: 10,
   alignSelf: 'stretch',
   justifyContent: 'center',
   padding: 5
 },
 bottomContainer: {
   justifyContent: 'flex-end',
   marginBottom: 60,
 },
 container: {
   flex: 1,
 },
 description: {
   fontSize: 40,
   textAlign: 'center',
 },
 downButton: {
   flex: 1,
 },
 list: {
   height: 100
 },
 instructions: {
   textAlign: 'center',
   marginBottom: 5,
 },
 text: {
   textAlign: 'center',
 },
 welcome: {
   fontSize: 45,
   padding:10,
   marginTop:20,
   textAlign: 'center',
  //  backgroundColor:'#005EFB ',
   fontWeight:'bold',
   color:'white'
 }
})

module.exports = Team;
