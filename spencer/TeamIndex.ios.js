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
  View
} from 'react-native';

class TestProject extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image
          source={require('./Kentucky_text.gif')}
          style={styles.backgroundImage}>

      <View style={styles.header}>
        <Text style={styles.welcome}>
          GameOn!
        </Text>
        </View>
          <View style={styles.teamsListHeader}>
            <Text style={styles.yourTeams}>
               Your Teams:
            </Text>
          </View>


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

            </Button>
          </View>


            <View style={styles.move}>
              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                Join Team
              </Button>

              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                Create Team
              </Button>

              <Button style={styles.pressButton}
                styleDisabled={{color: 'red'}}
                onPress={this._handlePress}
              >
                Edit Profile
              </Button>
          </View>
        </Image>
      </View>
    );
  }
  _handlePress(event) {
    console.log('Pressed!');
  }
}

module.exports = TestProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: 'purple',
  },
  welcome: {
    fontSize: 45,
    textAlign: 'center',
    backgroundColor: 'orange',
    margin: 10,
    flex:1
  },
  header: {
    flexDirection:'row',
    backgroundColor: 'blue',
    alignSelf:'stretch'
  },
  pressButton: {
    color: 'orange',
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    marginTop:10,
    height:40,
    flex:1
  },
  move: {
    flex:1,
    // backgroundColor:'green',
    justifyContent: 'flex-end'
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    marginTop:20
  },
  teamsListHeader:{
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  yourTeams:{
    fontSize: 20
  }
});

AppRegistry.registerComponent('TestProject', () => TestProject);
