import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator}from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import HomeScreen from './screens/Home'
import {AsyncStorage} from 'react-native';

import AppContainer from './navigation'
import LoginForm from './screens/LoginForm'
export default class App extends Component {
  
  render() {
    return <AppContainer />
  }
}
