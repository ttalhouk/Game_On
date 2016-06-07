
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
   console.log("************* before fetch **************")

   console.log("*********** this.prop **************")
   console.log(this.prop)
   console.log("************* this.state *************")
   console.log(this.state)


  //  fetch('https://54c7e287.ngrok.io/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.team.id+'/rsvps', {
  //    method: 'GET',
  //    headers: {
  //      'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //    },
  //  })
  //  .then((response) => response.json())
  //  .then((response) => {
  //    console.log("******** get pending rsvp response ***************")
  //    console.log(response)
  //    if (response.error) {
  //      // this is incorrect credentials
  //      this.setState({
  //        errorMessages: response.errorMessages
  //      })
  //    }else{
  //      this.setState({
  //        gameInfo: response.games,
  //        dataSource: this.state.dataSource.cloneWithRows(response.games),
  //        loading: false,
  //      });
  //    }
  //  });
 }

 componentWillMount(){
   this.getPendingRsvp();
  //  this.setState({
  //    dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.team)
  //  });
 }

  renderRsvp(rowData) {
    return (
      <View style={styles.requestRow}>
        <Text style={styles.requestInfo}>{rowData.name}</Text>
        <TouchableHighlight onPress={this.log.bind(this)} style={styles.acceptButton}>
          <Text>
            Accept
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.log.bind(this)} style={styles.declineButton}>
          <Text>
            Decline
          </Text>
        </TouchableHighlight>
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
        <Text style={styles.welcome}>
          Game Requests
        </Text>
        <ScrollView style={styles.contentContainer} >
          <ListView
            dataSource={this.state.dataSource}
            renderRsvp={this.renderRsvp.bind(this)} />
        </ScrollView>
      </View>
    )}
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
    backgroundColor:'#005EFB',
    fontWeight:'bold'
  },
})

module.exports = Rsvp;
