import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Image,
    Linking,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage } from 'react-native';
import Home from '../screens/Home'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faRecordVinyl,
    faUserCircle,
    faCloudRain,
    faPlaneDeparture,
    faPlusSquare,
    faDumpster,
    faUserPlus,
    faCoffee,
    faCocktail,
    faCloudShowersHeavy,
    faFireAlt,
    faLaughBeam,
    faEdit,
    faTrash
  } from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
import sounddump from '../assets/sounddump.png'
import vinyl from "../assets/vinyl.png"
export default class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.navigation.state.params,
      token: ''
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('this is incomp' + this.state.post.id);
    this.state.token = token;
    return fetch(`http://localhost:8000/api/posts/${this.state.post.id}`, {
      headers: {
        Authorization: `JWT ${this.state.token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log('response' + response);
        this.setState({
          post: response
        });
      });
  };
  handlelogout = () => {
    AsyncStorage.removeItem('token');
    this.setState({
      loggedIn: false
    });
    this.props.navigation.navigate('Login');
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
    let post = this.state.post
    if (post.vibe === 'chill') {
        post.vibe = (
          <FontAwesomeIcon icon={faCoffee} shadowRadius={3} color={'#D1ABAD'} flex={1} size={28} />
        );
      } else if (post.vibe === 'sensual') {
        post.vibe = <FontAwesomeIcon icon={faFireAlt} flex={1} color={'red'} size={25} />;
      } else if (post.vibe === 'moody') {
        post.vibe = (
          <FontAwesomeIcon
            icon={faCloudRain}
            color={'grey'}
            size={25}
            flex={1}
            fontWeight
          />
        );
      } else if (post.vibe === 'party') {
        post.vibe = (
          <FontAwesomeIcon icon={faCocktail} color={'#CEBACF'} flex={1} size={25} />
        );
      } else if (post.vibe === 'upbeat') {
        post.vibe = (
          <FontAwesomeIcon icon={faLaughBeam} color={'#4BC6B9'} flex={1} size={25} />
        );
      } else {
        post.vibe = (
          <FontAwesomeIcon
            icon={faPlaneDeparture}
            color={'#7B0828'}
            size={25}
            flex={1}
          />
        );
      }

    return (
      <View style={{ flex: 1, backgroundColor: '#fbf7f5' }}>
           <Button style={styles.button} title="Logout"  onPress={() => this.handlelogout()}/>
        <TouchableOpacity style={styles.sounddump} onPress={() => this.props.navigation.navigate('Home')} >
        <Image source={vinyl} style={styles.sounddump} />
        </TouchableOpacity>
     
        

        <View style={styles.post}>
        <Text style={styles.title}>{post.title}</Text>

<Text style={styles.artist}>{post.title}</Text>
<Text style={styles.artist}>{post.artist}</Text>
        
            <ImageBackground
                source={require('../assets/vinyl.png')}
                style={styles.vinylStyle}
              >
                <TouchableOpacity onPress={() => Linking.openURL(post.caption)}>
                  <Image
                    source={{ uri: `${post.link}` }}
                    style={styles.album}
                    
                  />
                 
                </TouchableOpacity>
              </ImageBackground>
              
        </View>
   
        <View style={styles.userinfo}>
              <FontAwesomeIcon
                icon={faUserCircle}
                color={'rgb(131, 167, 222)'}
                size={30}
                paddingBottom={0}
               
              />
                  <Text
                  style={styles.userstyle}
                >{post.author}</Text>
                 <Text style={styles.trashh}>
                  <FontAwesomeIcon
                  onPress={() => this.deletePost(post.pk)}
                  icon={ faTrash }
                  size={24}
                  flex={1}
                  color={'rgb(131, 167, 222)'}
                />
                <FontAwesomeIcon onPress={() => this.editPost(post.pk)}
                icon={ faEdit}
                size={24}
                flex={1}
                flexDirection={'row'}
                color={'rgb(131, 167, 222)'}/>
                  </Text> 
                 {/* <Text style={styles.vibe}>{post.vibe}</Text> */}
            
    
      </View>
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
    signupbutton: {
      flex: 1,
      alignItems: 'flex-start',
      paddingRight: 200
    },
    vibe: {
      flex: 1,
      textAlign: 'right',
      flexDirection: 'row',
      marginBottom: 0,
      paddingBottom: 0
    },
    trashh: {
      flex: 1,
      textAlign: 'center',
      backgroundColor: '#fbf7f5',
     
    },
    maintitle: {
      flex: 1,
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
      marginTop: 0,
      paddingTop: 0,
      shadowColor: 'grey',
      shadowOpacity: 0.6,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 0}
    },
    artist: {
        color: 'rgb(197, 139,211)',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: 'shrikhand',
        textAlign: 'center',
        paddingBottom: 0,
    },
    userinfo: {
      flex: 1,
      marginTop: 10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    bottomstuff: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      // fontFamily: 'shrikhand',
      color: 'rgb(197, 139, 211)'
    },
    userstyle: {
      textAlign: 'left',
      flex: 1,
      flexGrow: 4,
      marginRight: 20,
      fontFamily: 'shrikhand',
      color: '#83A7DE',
      fontSize: 18
    },
    songdeet: {
        color: 'rgb(197, 139,211)',
        justifyContent: 'center',
        flex: 1
    },
    title:  {
      flex: 1,
      marginBottom: 0,
      height: 5,
      color: 'rgb(197, 139,211)',
      justifyContent: 'center',
      fontSize: 25,
      fontFamily: 'shrikhand',
      textAlign: 'center',
      marginTop: 0,
      paddingBottom: 0,
    //   height: 40,
    //   resizeMode: 'contain'
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
        height: 40,
        width: 40,
        marginLeft: 92,
        flex: 1,
        resizeMode: 'contain',
    
      // color: 'rgb(197, 139, 211)',
     
    }
  });
  