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

class TeamChat extends Component {
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
         <TouchableHighlight style={styles.button} onPress={this.goToChat.bind(this, team)}>
           <Text style={styles.buttonText}>{team.name}</Text>
         </TouchableHighlight>
     </View>
   )
 }

 goToChat(team) {
   this.props.navigator.push({
     name: 'chat',
     passProps: this.props.userInfo,
     clickedTeam: team
   })
 }


 componentWillMount(){
   if (this.props.userInfo.team.length != 0) {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
     });
   }

 }

 renderList(){
   return (
     <ListView
   dataSource={this.state.dataSource}
   renderRow={this.renderTeam.bind(this)}
   style={styles.list}
         />
       )
 }

 renderNoTeams(){
   return (
       <Text style={styles.text}>
         no chat for you
       </Text>
     )
 }


 render() {

   let playerHasTeam = (this.props.userInfo.team.length == 0) ? this.renderNoTeams() : this.renderList();
   return (
     <View style={styles.container}>
       <Text style={styles.welcome}>
         Your Teams
       </Text>

       {playerHasTeam}


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

module.exports = TeamChat;
