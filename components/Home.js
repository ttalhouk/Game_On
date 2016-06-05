import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ListView
} from 'react-native';
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      userInfo: {

      }
    }
  }

  back(){
    console.log(this.state)
    // this.props.navigator.pop()
  }

  componentWillMount(){
    this.setState({
      userInfo: this.props.userInfo,
      dataSource: this.state.dataSource.cloneWithRows(this.props.userInfo.teams)
    });
  }

  componenetDidMount(){
    console.log(this.state)
  }

  renderTeam(team){
    return (
      <View style={styles.container}>
        <View>
          <Text>{team.name}</Text>
        </View>
      </View>
    )
  }

  render() {

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTeam}
      />
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
});
module.exports = Home;
AppRegistry.registerComponent('Home', () => Home);
