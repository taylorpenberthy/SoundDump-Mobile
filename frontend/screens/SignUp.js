import React, { Component } from 'react'
import axios from 'axios'
import Home from './Home'
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native'
import App from '../App'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        }
    }

    handleSubmit = () => {
        return axios.post('http://localhost:8000/api/auth/users/', {
            'username': this.state.username,
            'password': this.state.password
        }, {
            'headers': {
                'Content-Type': 'application/json'
            }
        }).then(res => {
          return res.json()})
          .then(json => {
              AsyncStorage.setItem('token', json.token)
              this.setState({
                  loggedIn: true,
                  username: json.username
              })
              this.props.navigation.navigate('Login')
          })
            
        }
        
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="username"
                    name='username'
                    onChangeText={(text) => this.setState({username: text})}/>
               </View>
               <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="password"
                    name='password'
                    onChangeText={(text) => this.setState({password: text})}/>
               </View>
               <Button title="Sign Up" style={styles.submitButtonText} onPress={() => this.handleSubmit()}/>
               <Button title='Log in' style={styles.submitButtonText} onPress={() => this.props.navigation.navigate('Login')}/>
               </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
    input: {
       margin: 15,
       fontSize: 40,
       marginBottom : 40,
       color : 'rgb(197, 139, 211)'
    },
    submitButton: {
       backgroundColor: 'rgb(197, 139, 211)',
       padding: 10,
       margin: 15,
       height: 60, 
    },
    submitButtonText:{
      color: 'rgb(197, 139, 211)',
      backgroundColor: 'rgb(255, 205, 192)',
      width:350,
      height:45,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center'
    },
   signUpText:{
      color: 'rgb(197, 139, 211)',
      alignItems: 'center'
   },
   inputContainer: {
      borderBottomColor: 'rgb(255, 205, 192)',
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      borderBottomWidth: 1,
      width:350,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
   },
   inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
   },
})