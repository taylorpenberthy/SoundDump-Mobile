import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import spotifyCredentials from '../secrets'

export default class PostFromSpotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.id,
      song_preview: '',
      image: '',
      linktosong: '',
      artist: '',
      title: '',
      vibe: '',
      token: ''
    };
  }
  componentDidMount = async () => {

    let spotToken = await AsyncStorage.getItem('spottoken');
    const token = await AsyncStorage.getItem('token');

    axios
      .get(`https://api.spotify.com/v1/tracks/${this.state.id}`, {
        headers: {
          Authorization: `Bearer ${spotToken}`
        }
      })
      .then(res => {
        console.log(res.data.album.artists);
        this.setState({
          song_preview: res.data.preview_url,
          artist: res.data.album.artists[0].name,
          image: res.data.album.images[0].url,
          linktosong: res.data.album.external_urls.spotify,
          title: res.data.name,
          token: token
        });
      });
  };
  handleSubmit = event => {
    
    event.preventDefault();
    return axios
      .post(
        'http://localhost:8000/api/posts/',
        {
          title: this.state.title,
          link: this.state.image,
          caption: this.state.song_preview,
          artist: this.state.artist,
          vibe: this.state.vibe
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${this.state.token}`
          }
        }
      )
      .then(res => {
        this.props.navigation.navigate('Home');
      });
  };
  render() {
    let data = [
      {
        value: 'moody'
      },
      {
        value: 'chill'
      },
      {
        value: 'sensual'
      },
      {
        value: 'party'
      },
      {
        value: 'upbeat'
      }
    ];

    return (
      <View style={styles.container}>
        <View style={styles.postfromspot}>
          <Text style={styles.title}>
            {this.state.title}
            <Image
              source={{ uri: this.state.image }}
              style={{
                width: 150,
                height: 150,
                marginBottom: 0,
                paddingBottom: 0
              }}
            />
            </Text>

          <View style={styles.inputContainer}>
            <Dropdown
              label='Vibe'
              paddingRight={75}
              data={data}
              onChangeText={text => this.setState({ vibe: text })}
            />
          </View>
          <Button
            title='Post now?'
            styles={{ marginBottom: 200 }}
            onPress={event => this.handleSubmit(event)}
          />
        
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fbf7f5',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 25
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
  postfromspot: {
    flex: 1
  },
  inputContainer: {
    borderBottomColor: 'rgb(255, 205, 192)',
    backgroundColor: 'rgb(131, 167, 222)',
    color: 'white',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 350,
    height: 45,
    marginBottom: 200,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
});
