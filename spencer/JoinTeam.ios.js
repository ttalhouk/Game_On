/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
var Button = require('react-native-button');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View
} from 'react-native';

class TestProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
            source={require('./basketball.gif')}
            style={styles.backgroundImage}>

        <View style={styles.header}>
          <Button style={styles.homeButton}
            styleDisabled={{color: 'red'}}
            onPress={this._handlePress}
          >
            Home
          </Button>
          </View>
            <View style={styles.pageTitle}>
              <Text style={styles.textCenter}>
                Join A Team
              </Text>
            </View>

          <View style={styles.move}>

            <View style={styles.teamButtons}>
              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                The SOMA GlobeTrotters
              </Button>
              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                The Other Team Placeholder
              </Button>
              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                The Other Team Placeholder
              </Button>
            </View>


        </View>
        </Image>
      </View>
    );
  }
}

module.exports = TestProject;

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    // marginTop:20
  },
  container: {
    flex: 1
    // justifyContent: 'flex-start'
    // backgroundColor: 'purple',
  },
  header: {
    flexDirection:'row',
    backgroundColor: 'blue',
    alignSelf:'stretch',
    marginTop:20
  },
  homeButton:{
    backgroundColor:'orange',
    height: 30,
    justifyContent: 'center',
    borderRadius:8,
    marginLeft:10,
    color:'white',
    overflow: 'hidden',
    padding: 5,
    margin:5
  },
  label: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  move: {
    flex:1,
    justifyContent:'center'
  },
  pageTitle:{
    backgroundColor:'orange'
    // alignSelf:'stretch'
    // textAlign:'center'
  },
  pressButton: {
    color: 'orange',
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    marginTop:10,
    paddingTop:10,
    height:40,
    flex:1
  },
  textCenter: {
    fontSize: 45,
    textAlign: 'center',
    margin: 10,
    flex:1
  },
  sports: {
    alignItems:'center'
  },
  yourTeams:{
    fontSize: 20
  }
});

AppRegistry.registerComponent('TestProject', () => TestProject);
