import React, { Component } from 'react';
import {
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import { AuthSession } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import vinyl from '../assets/vinyl.png';
export default class Search extends Component {
  state = {
    userInfo: null,
    didError: false
  };
  handleSpotifyLogin = async () => {
    let redirectUrl = 'https://auth.expo.io/@tpenberthy/frontend';
    let results = await AuthSession.startAsync({
      authUrl: `https://accounts.spotify.com/authorize?client_id=${
        process.env.CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&scope=user-read-email&response_type=token`
    });
    if (results.type !== 'success') {
      this.setState({ didError: true });
    } else {
      const userInfo = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${results.params.access_token}`
        }
      });
      const spottoke = AsyncStorage.setItem(
        'spottoken',
        results.params.access_token
      );
      this.setState({ userInfo: userInfo.data });
      console.log(this.state.userInfo);
    }
  };
  displayError = () => {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.errorText}>
          There was an error, please try again.
        </Text>
      </View>
    );
  };
  handleSubmit = () => {
    return axios
      .post(
        'http://localhost:8000/api/auth-jwt/',
        {
          username: this.state.userInfo.id,
          password: this.state.userInfo.id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('username', res.data.user.username);
        this.setState({
          username: res.data.user.username,
          loggedIn: true,
          token: res.data.token
        });
        console.log('state' + this.state.token);
        this.props.navigation.navigate('App');
      });
  };
  displayResults = () => {
    {
      return this.state.userInfo ? (
        <View style={styles.userInfo}>
          <View style={styles.userpicanduser}>
            <Image
              style={styles.profileImage}
              source={{ uri: this.state.userInfo.images[0].url }}
            />
            <View>
              <Text style={styles.userInfoText}>
                {this.state.userInfo.display_name}
              </Text>
            </View>
          </View>

          <Button
            title='Press me to authenticate!'
            onPress={() => this.handleSubmit()}
          />

          <TouchableOpacity
            style={styles.sounddumpenter}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={styles.sounddumpenter}>Enter SoundDump</Text>
            <Image source={vinyl} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>
            Login to Spotify to use SoundDump.
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FontAwesome name='spotify' color='#2FD566' size={100} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSpotifyLogin}
          disabled={this.state.userInfo ? true : false}
        >
          <Text style={styles.buttonText}>Login with Spotify</Text>
        </TouchableOpacity>
        {this.state.didError ? this.displayError() : this.displayResults()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fbf7f5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  userpicanduser: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#2FD566',
    padding: 20,
    borderRadius: 50
  },
  entersite: {
    width: 100,
    height: 30
  },
  buttonText: {
    color: '#000',
    fontSize: 20
  },
  userInfo: {
    height: 250,
    width: 200,
    alignItems: 'center'
  },
  userInfoText: {
    color: '#CB8589',
    fontSize: 18
  },
  errorText: {
    color: '#CB8589',
    fontSize: 18
  },
  profileImage: {
    height: 64,
    width: 64,
    marginBottom: 32
  },
  sounddumpenter: {
    flex: 1,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center'
  }
 
});
