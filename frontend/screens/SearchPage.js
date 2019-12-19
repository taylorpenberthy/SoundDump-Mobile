import React, { Component } from 'react';
import axios from 'axios';
import {
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FormData,
  AsyncStorage,
  FlatList
} from 'react-native';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import PostFromSpotify from '../screens/PostFromSpotify';
export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      link: '',
      caption: '',
      vibe: '',
      artist: '',
      search: '',
      songs: [],
      token: AsyncStorage.getItem('token')
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.state.token = token;
    fetch('sound-backend.herokuapp.com/api/auth/current_user/', {
      headers: {
        Authorization: `JWT ${this.state.token}`
      }
    }).then(res => {
      this.setState({
        username: res.data.user.username
      });

      console.log(this.state.token);
    });
    refreshList = () => {
      axios
        .get('https://sound-backend.herokuapp.com/api/posts/')
        .then(res => {
          return res.json();
        })
        .then(response => {
          this.setState({ posts: response });
        });
    };
    handleSubmit = async e => {
      e.preventDefault();
      e = this.state.search;
      let spotToken = await AsyncStorage.getItem('spottoken');

      axios
        .get(`https://api.spotify.com/v1/search?q=${e}&type=track&limit=7`, {
          headers: {
            Authorization: `Bearer ${spotToken}`
          }
        })
        .then(res => {
          return res.data.tracks.items;
        })
        .then(response => {
          this.setState({
            songs: response
          });
        });
      console.log('submit ' + response.name);
    };
    searchSpotify = async search => {
      console.log('search' + search);
      this.state.songs = [];
      let spotToken = await AsyncStorage.getItem('spottoken');
      console.log('spt token' + spotToken);
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${search}&type=track&limit=7`,
          {
            headers: {
              Authorization: `Bearer ${spotToken}`
            }
          }
        )
        .then(res => {
          return res.data.tracks.items;
        })
        .then(response => {
          let arr = [];
          response.map(song => {
            arr.push([song.name, song.id]);
          });
          this.setState({
            songs: arr
          });
          console.log('state songs' + this.state.songs);
        });
    };
  };
  handlefill = e => {
    console.log('handle fill' + e.target);
    axios.get();
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
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='Search Spotify'
            onChangeText={letter =>
              this.setState({
                search: letter
              })
            }
          />
        </View>

        <Button
          title='Search'
          style={styles.submitButtonText}
          onPress={event => handleSubmit(event)}
        />

        {this.state.songs.map(song => {
          console.log(song.artist);
          return (
            <View style={styles.list}>
              <Text
                style={styles.results}
                onPress={() => {
                  this.props.navigation.navigate('PostFromSpotify', {
                    id: song.id
                  });
                  this.handlefill(song);
                }}
              >
                <FontAwesomeIcon
                  flex={1}
                  flexDirection={'row'}
                  icon={faPlusCircle}
                  size={15}
                  color={'#CB8589'}
                />{' '}
                {song.name}
                <Text style={styles.title}>{song.artist}</Text>
              </Text>
            </View>
          );
        })}
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
  results: {
    color: '#CB8589',
    fontSize: 15,
    margin: 5
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
});
