import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import axios from 'axios';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import vinyl from '../assets/vinyl.png';
export default class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: ''
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get('http://localhost:8000/api/auth/current_user/', {
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          user: res.data
        });
      });
  };
  render() {
    if (this.state.user.id === '') {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.dump}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          >
            <Image source={vinyl} style={styles.dump} />
          </TouchableOpacity>
          <View style={styles.iconandname}>
            <FontAwesomeIcon
              icon={faUserAstronaut}
              color={'rgb(231, 210, 141)'}
              size={38}
            />
            <Text style={styles.textstuff}>
              Hello, {this.state.user.username}
            </Text>
          </View>
          <View style={styles.navigatehome}></View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbf7f5'
  },
  iconandname: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textstuff: {
    fontSize: 34,
    textAlign: 'right',
    color: 'rgb(231, 210, 141)'
  },
  dump: {
    height: 40,
    width: 40,
    flex: 1,
    resizeMode: 'contain'
  }
});
