'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
} from 'react-native';

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Rsvp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  render() {
    return (
      <ListView
        numbers.forEach(function(num) {
        <Text>
          {num}
        </Text>
      </ListView>
    })
  )}

  // convertFoodArrayToMap() {
  //   var foodCategoryMap = {};
  //   food.forEach(function(foodItem) {
  //     if (!foodCategoryMap[foodItem.category]) {
  //       foodCategoryMap[foodItem.category] = [];
  //     }
  //     foodCategoryMap[foodItem.category].push(foodItem);
  //   });
  //   console.log(foodCategoryMap)
  //   return foodCategoryMap;
  // }
  //
  // getInitialState() {
  //   var dataSource = new ListView.DataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2,
  //     sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  //   });
  //   console.log(dataSource)
  //   return {
  //     dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodArrayToMap())
  //   };
  // }
  //
  // render() {
  //   return (
  //     <ListView
  //       dataSource={this.state.dataSource}
  //       renderRow={this.renderRow.bind(this)}
  //       renderSectionHeader={this.renderSectionHeader}
  //     />
  //   )
  // }
  //
  // renderRow() {
  //   return (
  //     <Text>{foodItem.name}</Text>
  //   )
  // }
  //
  // renderSectionHeader(sectionData, category) {
  //   return (
  //     <Text style={{fontWeight: "700"}}>{category}</Text>
  //   )
  // }
}

var styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  }
})

module.exports = Rsvp;
