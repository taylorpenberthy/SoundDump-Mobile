import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Image
} from 'react-native';
import App from '../App';
import sounddump from '../assets/sounddump.png';
import SignUp from './SignUp';
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  handleSubmit = () => {
    return axios
      .post(
        'sound-backend.herokuapp.com/api/auth-jwt/',
        {
          username: this.state.username,
          password: this.state.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log(res);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('username', res.data.user.username);
        this.setState({
          username: res.data.user.username,
          loggedIn: true,
          token: res.data.token
        });
        this.props.navigation.navigate('App');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={sounddump} style={styles.sounddump} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='username'
            name='username'
            onChangeText={text => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='password'
            secureTextEntry
            name='password'
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <Button
          title='Log In'
          style={styles.submitButtonText}
          onPress={() => this.handleSubmit()}
        />
        <Button
          title='OR Login with Spotify'
          onPress={() => {
            this.props.navigation.navigate('Search');
          }}
        />
        <Button
          title='Go to Signup'
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbf7f5'
  },
  input: {
    margin: 15,
    fontSize: 40,
    marginBottom: 40,
    color: 'rgb(197, 139, 211)'
  },
  submitButton: {
    backgroundColor: 'rgb(197, 139, 211)',
    padding: 10,
    margin: 15,
    height: 60
  },
  submitButtonText: {
    color: 'rgb(197, 139, 211)',
    backgroundColor: 'rgb(255, 205, 192)',
    width: 350,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpText: {
    color: 'rgb(197, 139, 211)',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: 'rgb(255, 205, 192)',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 350,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sounddump: {
    marginLeft: 100,
    marginRight: 20,
    height: 300
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
});
