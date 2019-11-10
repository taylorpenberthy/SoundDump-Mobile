import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator}from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import HomeScreen from './screens/Home'
import Search from './screens/Search'

export default class App extends Component {
  
  render() {
    return <AppContainer />;
  }
       
}
const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Search: {
    screen: Search
  }
},
{
  initialRouteName: 'Home'
})

const AppContainer = createAppContainer(AppNavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
