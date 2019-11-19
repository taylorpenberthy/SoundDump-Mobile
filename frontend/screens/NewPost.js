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
  AsyncStorage
} from 'react-native';
import qs from 'qs';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      link: '',
      caption: '',
      vibe: '',
      artist: '',
      songs: [],
      token: AsyncStorage.getItem('token')
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.state.token = token;
    fetch('http://http://localhost:8000/api/auth/current_user/', {
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
        .get('http://localhost:8000/api/posts/')
        .then(res => {
          return res.json();
        })
        .then(response => {
          this.setState({ posts: response });
        });
    };
    handleSubmit = e => {
      console.log(this.state.author);
      e.preventDefault();
      let posts = this.state;
      return axios
        .post(
          'http://localhost:8000/api/posts/',
          {
            title: this.state.title,
            link: this.state.link,
            caption: this.state.caption,
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
          console.log(res);
          this.props.navigation.navigate('Home');
        })
        .catch(err => console.log(err));
    };
  };
  searchSpotify = async search => {
    console.log('search' + search);
    this.state.songs = [];
    let spotToken = await AsyncStorage.getItem('spottoken');
    console.log('spt token' + spotToken);
    axios
      .get(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=3`, {
        headers: {
          Authorization: `Bearer ${spotToken}`
        }
      })
      .then(res => {
        return res.data.tracks.items;
      })
      .then(response => {
        response.map(song => {
          this.setState({
            songs: song.name
          });
          console.log(song.name);
          console.log(song.id);
        });
      });
  };
  autofillinputs = e => {
    console.log('e' + e);
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
            placeholder='Title'
            name='title'
            onChangeText={text => this.setState({ title: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='Artist'
            name='artist'
            onChangeText={text => this.setState({ artist: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='Image'
            name='link'
            onChangeText={text => this.setState({ link: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='Link to Song'
            name='caption'
            onChangeText={text => this.setState({ caption: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            label='Vibe'
            padding={50}
            data={data}
            onChangeText={text => this.setState({ vibe: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={StyleSheet.inputs}
            placeholder='Search Spotify'
            onChangeText={letter => this.searchSpotify(letter)}
          />

          <Text
            onPress={() => {
              this.autofillinputs(this.state.songs);
            }}
          >
            {this.state.songs}
          </Text>
        </View>

        {/* <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="Comments"
                    name='comments'
                    onChangeText={(text) => this.setState({comments: text})}/>
               </View> */}
        <Button
          title='Post'
          style={styles.submitButtonText}
          onPress={event => handleSubmit(event)}
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
});
