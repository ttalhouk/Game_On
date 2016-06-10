import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 TabBarIOS,
 Text,
 View,
 ListView,
 Navigator,
 TouchableHighlight,
 Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

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
   team.name = team.name[0].toUpperCase() + team.name.substring(1);
   return (
     <View style={styles.container}>
         <TouchableHighlight style={styles.button} onPress={this.goToChat.bind(this, team)}>
         <View style={[{flex:1},{flexDirection:'row'}]}>
          <View style={[{flex:.80},{justifyContent:'space-around'}]}>
           <Text style={styles.buttonText}>{team.name}</Text>
           </View>
           <View style={[{flex:.20},{justifyContent:'space-around'}]}><Text>
           <Icon
             name="ios-arrow-forward"
             size={30}
             style={styles.icon}/>
             </Text>
             </View>
           </View>
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
    fontSize: 30,
    fontWeight:'bold',
    color: '#FFA64C',
    alignSelf: 'center'
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode:'contain',
  },
  button: {
    height: 150,
    backgroundColor: '#005EFB',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    // padding: 76,
    margin: 5,
    opacity:.95,
  },
  topContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#FFA64C',
    flexDirection:'row',
    padding:10
  },
  container: {
    flex: 1,
    backgroundColor:'#E5E5E5'
  },
  createJoinButton: {
    backgroundColor: '#005EFB',
    borderRadius: 8,
    padding:10
  },
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  icon: {
    // justifyContent: 'space-around',
    // paddingLeft: 100,
    alignItems: "flex-end",
    // paddingRight: 100,
  },
  joinButtonText:{
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  // list: {
  //   height: 100
  // },
  leftContainer: {
    flex:1,
    marginRight:5,
    justifyContent:'center',
    justifyContent:'space-around'
  },
  rightContainer: {
    flex:1,
    marginLeft:5,
    justifyContent:'center',
    justifyContent:'space-around'

  },
  teamBox:{
    flex:1,
    justifyContent:'flex-start'
  },
  welcome: {
    fontSize: 18,
    paddingTop:20,
    padding:5,
    color: 'black',
    textAlign: 'center',
    backgroundColor:'#D3D3D3',
    fontWeight:'bold'
  }
})

module.exports = TeamChat;
