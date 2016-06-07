import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  ScrollView,
  DatePickerIOS
} from 'react-native';

import DatePicker from '../utils/DatePicker'
var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    borderWidth: 1
  },
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    color: 'black',
    alignSelf: 'stretch',
    backgroundColor: 'silver',
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
var ScheduleGame = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      userInfo: {

      }
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      address: '',
    };
  },

  onDateChange: function(date) {
    this.setState({date: date});
  },

  componentWillMount: function(){
    this.setState({
      userInfo: this.props.userInfo
    })
  },

  log: function(){
    console.log(this.props)
    console.log(this.state)
  },

  back: function(){
    this.props.navigator.pop();
  },

  scheduleGame: function(){
    fetch(GLOBAL.ngrok+'/players/'+this.props.userInfo.info.id+'/teams/'+this.props.userInfo.teams[0].id+'/games', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: this.state.date,
        address: this.state.address,
        city: this.state.city,
        zip_code: this.state.zip,
      })
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        console.log('ERROR!!!!!!!!')
        console.log(response)
          this.setState({
            errorMessages: response.errorMessages
        })
      }else{
        console.log(response);
      }
    })
  },


  render: function() {
    return (
      <View style={styles.container}>
      <ScrollView>


        <View>
        <TouchableHighlight onPress={this.back} style={styles.button}>
          <Text style={styles.buttonText}>
            Back
          </Text>
        </TouchableHighlight>
        </View>

        <DatePickerIOS
              date={this.state.date}
              mode="datetime"
              timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
              onDateChange={this.onDateChange}/>
      <TextInput
        style={styles.input}
        placeholder='Address:'
        onChangeText={(address) => {this.setState({address: address})}}
      />
      <TextInput
        style={styles.input}
        placeholder='City:'
        onChangeText={(city) => {this.setState({city: city})}}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Zip:'
        onChangeText={(zip) => {this.setState({zip: zip})}}
        keyboardType='email-address'
      />
      <TouchableHighlight onPress={this.scheduleGame}>
        <Text style={styles.description}>
          Game On!
        </Text>
      </TouchableHighlight>
      </ScrollView>
      </View>
    )
  },
})
module.exports = ScheduleGame;
