import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator}from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import HomeScreen from './screens/Home'
import {AsyncStorage} from 'react-native';
import PlayerScreen from './screens/PlayerScreen'
import EditPost from './screens/EditPost'

import LoginForm from './screens/LoginForm'
export default class App extends Component {
  

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: '',
    
    }
  }

  
  render() {
    return <AppContainer />
    if (this.state.loggedIn) {
        return <AppContainer />
      // return  <AppContainer />
    }
    else {
      return <LoginForm />
    }
    }
  }

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
 
  New: {
    screen: PlayerScreen
  },
  Edit: {
    screen: EditPost
  },
  Login: {
    screen: LoginForm
  }
  
},
{
  initialRouteName: 'Home'
})

const AppContainer = createAppContainer(AppNavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});
