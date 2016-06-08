
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

  log(){
   console.log(this.props)
 }

 getPendingRsvp() {
   fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/rsvps', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
   })
   .then((response) => response.json())
   .then((response) => {
     console.log("************* getPendingRsvp response **************")
     console.log(response)
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
   console.log("************* acceptRsvp rsvp ************")
   console.log(rsvp)
   fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/rsvps/'+rsvp.rsvp_id, {
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
   console.log("************* declineRsvp rsvp ************")
   console.log(rsvp)
   fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/rsvps/'+rsvp.rsvp_id, {
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
    return (
      <View style={styles.requestRow}>
      <View>
        <Text style={styles.requestInfo}>{rsvp.player_team}</Text>
        <Text style={styles.requestInfo}>{rsvp.address}</Text>
        <Text style={styles.requestInfo}>{rsvp.city}, {rsvp.zip_code}</Text>
        <Text style={styles.requestInfo}>{rsvp.start_time}</Text>
        </View>
        <TouchableHighlight onPress={this.acceptRsvp.bind(this, rsvp)} style={styles.acceptButton}>
          <Text>Accept</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.declineRsvp.bind(this, rsvp)} style={styles.declineButton}>
          <Text>Decline</Text>
        </TouchableHighlight>

      </View>
    )
 }

 renderLoadingView() {
   return (
     <View style={styles.container}>
         <Text style={styles.loadingContainer}>LOADING!</Text>
     </View>
   )
 }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    } else if (this.state.noRsvp) { return (
      <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Game Requests</Text>
        </View>
      <View><Text style={styles.text}>{this.state.noRsvp}</Text></View>
      </View>
    )} else {

    return (
      <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Game Requests</Text>
        </View>
        <ScrollView>
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
    flex: 1
  },
  acceptButton:{
    backgroundColor:'green',
    padding:5,
    marginRight: 5
  },
  declineButton:{
    backgroundColor:'red',
    padding:5,
    marginRight: 5
  },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  requestRow: {
    flex:1,
    marginBottom:10,
    backgroundColor:'#005EFB',
    padding:10,
    flexDirection:'row',
  },
  requestInfo:{
    color:'white',
    backgroundColor:'#005EFB',
    textAlign:'center',
    padding:5,
    width:250,
    fontSize:10,
    fontWeight: 'bold',
    paddingTop:8,
    paddingLeft:0
  },
  space:{
    flex:1
  },
  welcome: {
    fontSize: 45,
    padding:10,
    marginTop:20,
    textAlign: 'center',
    backgroundColor:'silver',
    fontWeight:'bold'
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
})

module.exports = Rsvp;
