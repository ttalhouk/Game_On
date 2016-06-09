
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  ListView,
    ActivityIndicatorIOS,
} from 'react-native';

class Rsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
       userInfo: {},
       loading: true,
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2
       }),
    };
  }

 getPendingRsvp() {
   fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/rsvps', {
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
     } else if(response.player.open_rsvp.length === 0) {
       this.setState({
         noRsvp: "You have no pending RSVPs",
         loading: false,
       })
     } else {
       this.setState({
         userInfo: response.player,
         dataSource: this.state.dataSource.cloneWithRows(response.player.open_rsvp),
         loading: false,
       });
     }
   });
 }

 componentWillMount(){
   this.getPendingRsvp();
 }

 acceptRsvp(rsvp) {

   fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/rsvps/'+rsvp.rsvp_id, {
     method: 'PATCH',
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
       this.render();
     }
   });
 }

 declineRsvp(rsvp) {
   fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/rsvps/'+rsvp.rsvp_id, {

     method: 'DELETE',
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
       this.render();
     }
   });
 }

  renderRsvp(rsvp) {
    rsvp.player_team = rsvp.player_team[0].toUpperCase() + rsvp.player_team.substring(1)
    return (
      <View style={styles.rsvpRow}>
        <TouchableHighlight onPress={this.acceptRsvp.bind(this, rsvp)} style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableHighlight>
        <View style={styles.rsvpInfo}>
          <Text style={styles.teamInfo}>{rsvp.player_team}</Text>
          <Text style={styles.requestInfo}>{rsvp.address}</Text>
          <Text style={styles.requestInfo}>{rsvp.city}, {rsvp.zip_code}</Text>
          <Text style={styles.requestInfo}>{rsvp.start_time}</Text>
        </View>
        <TouchableHighlight onPress={this.declineRsvp.bind(this, rsvp)} style={styles.declineButton}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableHighlight>
      </View>
    )
 }

 renderLoadingView() {
   return (
     <ActivityIndicatorIOS
     animating={this.state.animating}
     style={[styles.centering, {height: 500}]}
     size="large"
   />
   )
 }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    } else if (this.state.noRsvp) { return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>RSVP</Text>
        </View>
        <View style={styles.blank}>
          <Text style={styles.noGameText}>{this.state.noRsvp}</Text>
        </View>
      </View>
    )} else {
    return (
      <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>RSVP</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRsvp.bind(this)} />
        </ScrollView>
      </View>
    )}
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E5E5E5',
  },
  acceptButton:{
    // backgroundColor:'green',
    width: 80,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: .3,
  },
  acceptButtonText:{
    // alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    color:'white',
    fontWeight: 'bold',
    backgroundColor:'#0043B6',
    padding: 10,
    borderRadius: 8,

    overflow: 'hidden',
  },
  blank:{
    justifyContent: 'space-around',
    alignItems:'stretch',
    flex:1,
  },
  declineButtonText:{
    // alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    color:'white',
    fontWeight: 'bold',
    backgroundColor:'#0043B6',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  declineButton:{
    // backgroundColor:'red',
    width: 80,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: .3,
  },
  noGameText:{
    fontSize:22,
    color:'#136AFF',
    fontWeight: 'bold',
    paddingTop:2,
    textAlign:'center',
    justifyContent: 'center',
    justifyContent: 'space-around'
  },
  requestRow: {
    flex:1,
    marginBottom:10,
    backgroundColor:'#3B82FC',
    padding:10,
    flexDirection:'row',
  },

  requestInfo:{
    color:'white',
    alignItems:'center',
    // justifyContent: 'center',
    padding:2,
    fontSize:14,
    fontWeight: 'bold',
    paddingTop:2,
    paddingLeft:0,
    flexDirection:'row'
  },
  rsvpInfo:{
//     color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
//     fontWeight:'bold',
    flex:1
   },
  rsvpRow:{
    backgroundColor:'#3B82FC',
    paddingTop:40,
    paddingBottom:40,
    marginTop:4,
    marginBottom:4,
    marginRight:8,
    marginLeft:8,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: .5,
    // borderBottomColor: 'white',
    // borderBottomWidth: 2,
    // borderTopColor: 'white',
    // borderTopWidth: 2,
    flexDirection:'row',
    alignItems: 'center'
     },
  scrollContainer:{
    flex: 1,
  },
  space:{
    flex: 1
  },
  teamInfo:{
    color:'#FFA655',
    alignItems:'center',
    // justifyContent: 'center',
    padding:2,
    fontSize:36,
    fontWeight: 'bold',
    paddingTop:2,
    paddingLeft:0,
    flexDirection:'row'
  },
  welcome: {
    fontSize: 15,
    paddingTop:20,
    padding:5,
    color: 'black',
    textAlign: 'center',
    backgroundColor:'#D3D3D3',
    fontWeight:'bold'
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
})

module.exports = Rsvp;
