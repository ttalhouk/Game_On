
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView,
  ScrollView,
  Image
} from 'react-native';
var firebase = require('firebase/app');
var database = require('firebase/database');
var config = {
  apiKey: require('../utils/globals').firebaseAPI,
  authDomain: "gameon-b2217.firebaseapp.com",
  databaseURL: "https://gameon-b2217.firebaseio.com",
  storageBucket: "gameon-b2217.appspot.com",
};
firebase.initializeApp(config);
var teamChat = firebase.database();
var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')

class Chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      noChatMessages: true,
    }
  }

  submit(){
    teamChat.ref('/'+this.props.clickedTeam.id+'/messages').push({
      name: this.props.userInfo.info.name,
      msg: this.state.emit
    })
  }

  componentDidMount(){

    teamChat.ref('/'+this.props.clickedTeam.id+'/messages').on('value', (response) => {
      var items = [];
      response.forEach((message) =>{
        items.push(message.val())
      })

      if (items.length == 0) {
        return
      }else{
        this.setState({
          noChatMessages: false,
          dataSource: this.state.dataSource.cloneWithRows(items)
        })
      }
    })
  }

  renderChat(item){
    return (
      <View style={styles.container}>
          <Text style={[{fontWeight:'bold'}]}>{item.name}</Text>
          <Text>{item.msg}</Text>
          <View style={styles.separator}></View>
      </View>
    )
  }

  render() {
    if (this.state.noChatMessages == true) {
      return <View style={styles.container}>
        <View style={[{flex: 1}, {marginTop: 50},{backgroundColor:'#E5E5E5'}]}>
          <Image style={styles.backgroundImage} source={require('../imgs/lace_logo.png')}>
            <Text>
              There are no messages yet, maybe you should post one!
            </Text>

            <View style={{flex: .2}}>
              <TextInput
                style={styles.input}
                placeholder='Chat with your teamates: '
                onChangeText={(input) => {
                  this.setState({
                    emit: input
                  })
                }}
              />
              <TouchableHighlight onPress={this.submit.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>
                  Submit
                </Text>
              </TouchableHighlight>
            </View>
          </Image>
        </View>
      </View>
    }
    return (
      <View style={styles.container}>
        <View style={[{flex: 1},{marginTop:50}, {backgroundColor:'#E5E5E5'}]}>
          <Image style={styles.backgroundImage} source={require('../imgs/lace_logo.png')}>
            <ScrollView style={{flex: .8}}>
              <ListView
                style={styles.chat}
                dataSource={this.state.dataSource}
                renderRow={this.renderChat.bind(this)}
              />
            </ScrollView>
            <View style={{flex: .2}}>
              <TextInput
                style={styles.input}
                placeholder='Chat with your teamates: '
                onChangeText={(input) => {
                  this.setState({
                    emit: input
                  })
                }}
              />
              <TouchableHighlight onPress={this.submit.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>
                  Submit
                </Text>
              </TouchableHighlight>
            </View>
          </Image>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
    resizeMode:'contain',
  },
  chat: {
    flex: 8,
    // paddingTop: 20,
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderWidth: 1,
    opacity:.95,
    // paddingLeft: 16,
    // height: 70
  },
  listview: {
    flex: 1,
  },
  separator: {
    height: 4,
    backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    alignSelf: 'stretch',
},
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    height: 36,
    backgroundColor: '#005EFB',
    // borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding:5
  },
  buttonText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
    alignSelf: 'center'
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginBottom: 20,
    color: 'white',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
})

module.exports = Chat;
