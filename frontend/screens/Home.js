import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Font from 'expo-font';
import UserPage from '../screens/UserPage'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Signup from './SignUp';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { ActivityIndicator } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import {
  faRecordVinyl,
  faUserCircle,
  faCloudRain,
  faUserAstronaut,
  faPlaneDeparture,
  faPlusSquare,
  faDumpster,
  faUserPlus,
  faCoffee,
  faCocktail,
  faCloudShowersHeavy,
  faFireAlt,
  faLaughBeam,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import sounddump from '../assets/sounddump.png';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      fontsLoaded: false,
      loggedIn: true,
      token: AsyncStorage.getItem('token')
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.state.token = token;
    console.log(this.state.token);
    Font.loadAsync({
      'russo-one': require('../assets/fonts/RussoOne-Regular.ttf'),
      shrikhand: require('../assets/fonts/Shrikhand-Regular.ttf')
    }).then(() => {
      this.setState({
        fontsLoaded: true
      });
    });
    return fetch('http://localhost:8000/api/posts/')
      .then(res => {
        return res.json();
      })
      .then(response => {
        this.setState({ posts: response });
      });
  };

  deletePost = post => {
    return axios
      .delete(`http://localhost:8000/api/posts/${post}/`, {
        headers: {
          Authorization: `JWT ${this.state.token}`
        }
      })
      .then(res => {
        res.json();
      })
      .then(json => {
        const items = this.state.posts.filter(item => item.id !== post);
        this.setState({
          posts: items
        });
      });
  };
  

  render() {
    this.state.posts.map(item => {
      if (item.vibe === 'chill') {
        item.vibe = (
          <FontAwesomeIcon
            icon={faCoffee}
            shadowRadius={3}
            shadowColor='grey'
            shadowOpacity={0.8}
            shadowOffset={{ width: 0, height: 0 }}
            color={'#D1ABAD'}
            flexDirection={'row'}
            flex={1}
            size={28}
          />
        );
      } else if (item.vibe === 'sensual') {
        item.vibe = (
          <FontAwesomeIcon icon={faFireAlt} flex={1} color={'red'} size={25} />
        );
      } else if (item.vibe === 'moody') {
        item.vibe = (
          <FontAwesomeIcon
            icon={faCloudRain}
            color={'grey'}
            size={25}
            flex={1}
            fontWeight
          />
        );
      } else if (item.vibe === 'party') {
        item.vibe = (
          <FontAwesomeIcon
            icon={faCocktail}
            color={'#CEBACF'}
            flex={1}
            size={25}
          />
        );
      } else if (item.vibe === 'upbeat') {
        item.vibe = (
          <FontAwesomeIcon
            icon={faLaughBeam}
            color={'#4BC6B9'}
            flex={1}
            size={25}
          />
        );
      } else {
        item.vibe = (
          <FontAwesomeIcon
            icon={faPlaneDeparture}
            color={'#7B0828'}
            size={25}
            flex={1}
          />
        );
      }
    });

    return (
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#fbf7f5' }}>
       {/* <Button title='seeerch'  */}
        {/* <View style={styles.signup}> */}
        {/* <FontAwesomeIcon icon={faUserPlus} color={'rgb(231, 210, 141)'}/> */}
        {/* <Button
          title='Sign Up'
          style={styles.signupbutton}
          onPress={() => this.props.navigation.navigate('SignUp')}
        /></View> */}

       
        {/* <View style={styles.maintitle}> */}
      
        <Image source={sounddump} style={styles.sounddump} />
        
        <View style={styles.nav}>
        
        <FontAwesomeIcon
            icon={faSpotify}
            color={'rgb(231, 210, 141)'}
            size={32}
            onPress={() => {this.props.navigation.navigate('SearchPage')}}/>
          <FontAwesomeIcon
            icon={faPlusSquare}
            color={'rgb(231, 210, 141)'}
            size={28}
            onPress={() => {
              this.props.navigation.navigate('NewPost');
            }}
          />
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('UserPage');
          }}>
          <FontAwesomeIcon icon={faUserAstronaut}
          color={'rgb(231, 210, 141)'}
          size={28} /></TouchableOpacity>

          
          
        </View>
        <FlatList
          data={this.state.posts}
          keyExtractor={({ item }, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'stretch',
                  fontFamily: 'shrikhand',
                  fontSize: 18,
                  color: '#CB8589'
                }}
                onPress={() => {
                  console.log(item.pk);
                  this.props.navigation.navigate('Individual', { id: item.pk });
                }}
              >
                {item.title}{' '}
              </Text>
              <Text style={styles.artist}>{item.artist}</Text>

              <ImageBackground
                source={require('../assets/vinyl.png')}
                style={styles.vinylStyle}
              >
                <TouchableOpacity onPress={() => Linking.openURL(item.caption)}>
                  <Image
                    source={{ uri: `${item.link}` }}
                    style={styles.album}
                  />
                </TouchableOpacity>
              </ImageBackground>
              <View style={styles.userinfo}>
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  color={'rgb(131, 167, 222)'}
                  size={24}
                  paddingBottom={0}
                />
                <Text style={styles.userstyle}>{item.author}</Text>
                {/* <Text style={styles.vibe}>{item.vibe}</Text> */}
              </View>

              <View style={styles.buttons}>
                {/* <Button color='rgb(131, 167, 222)' title="Delete" onPress={() => this.deletePost(item.pk)}/> */}

                {/*            
             <Button color='rgb(131, 167, 222)' title="Edit" onPress={() => this.props.navigation.navigate('Edit')}/> */}
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // fontFamily: 'shrikhand',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  post: {
    marginTop: 20
  },
  signupbutton: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 200
  },
  vibe: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
    right: 0,
    justifyContent: 'space-around',
    alignSelf: 'flex-end'
  },
  artist: {
    fontStyle: 'italic',
    color: '#CB8589',
    textAlign: 'center'
  },

  trashh: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: '#fbf7f5'
  },
  maintitle: {
    flex: 1
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 15,
    alignItems: 'stretch',
    backgroundColor: '#fbf7f5',
    paddingBottom: 18
    
  },
  signupbutton: {
    flex: 1,
    alignSelf: 'flex-start',
    textAlign: 'left'
  },
  vinylStyle: {
    width: 400,
    height: 400,
    marginLeft: 7,
    shadowColor: 'grey',
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 }
  },
  userinfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 60
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    // fontFamily: 'shrikhand',
    color: 'rgb(197, 139, 211)'
  },
  userstyle: {
    textAlign: 'left',
    marginRight: 5,
    flex: 1,
    fontFamily: 'shrikhand',
    color: '#83A7DE',
    fontSize: 18
  },
  title: {
    flex: 1,
    // backgroundColor: 'rgb(253, 190, 219)',
    color: 'rgb(197, 139,211)',
    justifyContent: 'center',
    fontSize: 20,
    // fontFamily: 'shrikhand',
    textAlign: 'center',
    margin: 10
  },
  button: {
    left: 0,
    top: 0,
    textAlign: 'left',
    marginLeft: 0,
    marginRight: 250,
    paddingRight: 200
  },
  album: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    marginTop: 70,
    marginLeft: 75,
    marginRight: 100
  },
  sounddump: {
    width: 400,
    height: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 50,
    // color: 'rgb(197, 139, 211)',
    color: 'rgb(131, 167, 222)',
    paddingBottom: 50
  }
});
