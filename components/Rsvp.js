
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
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{name: 'Chunyuasdfasd vs. Spencer 10/31 @ 5:45PM'}, {name: 'Spencer vs. Chunyu 10/31 @ 5:45PM'}]),
    };
  }

  log(){
   console.log(this.props)
 }

  renderRow(rowData) {
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


  render() {
    // var numbers = ['Request1','Request2','Request3','Request4','Request5','Request6'];
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Game Requests
        </Text>
        <ScrollView style={styles.contentContainer} >

          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />

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
