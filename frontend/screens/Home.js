import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, Linking, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Font  from 'expo-font'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Signup from './SignUp';
import { ActivityIndicator } from 'react-native'
import { faRecordVinyl, faUserCircle, faPlaneDeparture, faPlusSquare, faCoffee,faCocktail, faCloudShowersHeavy, faFire, faLaughBeam } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



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

   componentDidMount ()  {
    console.log(this.state.token)
      Font.loadAsync({
        'russo-one': require('../assets/fonts/RussoOne-Regular.ttf'),
        'shrikhand': require('../assets/fonts/Shrikhand-Regular.ttf')
       
    }).then(() => {
      this.setState({
        fontsLoaded: true
      })
    })
    return fetch('http://localhost:8000/api/posts/')
    // return fetch('http://localhost:8000/api/posts/', {
    //   headers: {
    //     "Authorization": `JWT ${this.state.token}`
    //   }
    // })
    .then(res => {
      return res.json()})
    .then(response => {
      this.setState({ posts: response })
    })
    
  }
  
  deletePost = post => {
      console.log(post)
      return fetch(`http://localhost:8000/api/posts/${post}`, {
          method: 'DELETE'
       
  }).then(res => {
    res.json();
  })
  .then(json => {
    const items = this.state.posts.filter(item => item.id !== post);
    this.setState({
      posts: items
    })

  })
  }
  handlelogout = () => {
    AsyncStorage.removeItem('token')
    this.setState({
      loggedIn: false
    })
    this.props.navigation.navigate('Login')
  }
  
  render() {
    this.state.posts.map(item=> {
      if (item.vibe === 'chill') {
        item.vibe = <FontAwesomeIcon icon={faCoffee} color={'#D1ABAD'} size={25}/>
      }else if (item.vibe === 'sensual') {
        item.vibe = <FontAwesomeIcon icon={faFire} color={'red'} size={25}/>
      }else if (item.vibe === 'moody') {
        item.vibe = <FontAwesomeIcon icon={faCloudShowersHeavy} color={'grey'} size={25} fontWeight/>
      }else if (item.vibe === 'party') {
        item.vibe = <FontAwesomeIcon icon={faCocktail} color={'#CEBACF'} size={25}/>
      }else if (item.vibe === 'upbeat') {
        item.vibe = <FontAwesomeIcon icon={faLaughBeam} color={'#4BC6B9'} size={25}/>
      }else {
        item.vibe = <FontAwesomeIcon icon={faPlaneDeparture} color={'#7B0828'} size={25}/>
      }
    })
    
   return(
     
      <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#fbf7f5' }}>
       <Button title="SignUp" onPress={() => this.props.navigation.navigate('SignUp')}/>
      <FontAwesomeIcon icon={faPlusSquare} color={'rgb(231, 210, 141)'} size={28} marginLeft={370} onPress={() => {this.props.navigation.navigate('PlayerScreen')}}/>
      {/* <Button style={styles.button} title="Logout"  onPress={() => this.handlelogout()}/> */}
        <Text style={styles.sounddump}>S<FontAwesomeIcon icon={ faRecordVinyl } color={'rgb(231, 210, 141)'} size={32} />undDump</Text>
        
      
        <FlatList
          data={this.state.posts}
          keyExtractor={({item} , index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post} >
              <Text style={{textAlign: 'center', alignSelf: 'stretch', marginBottom: 10, fontFamily: 'shrikhand', fontSize: 20, color: '#CB8589'}}>{item.title} {item.vibe} </Text>
              <ImageBackground source={require('../assets/vinyl.png')} style={{width: 400, height: 400, marginLeft: 7, marginBottom: 20}}>
             <TouchableOpacity onPress={() => Linking.openURL(item.caption)}>
           <Image source={{ uri: `${item.link}`}} style={styles.album}  /></TouchableOpacity>
           
           </ImageBackground>
          <FontAwesomeIcon icon={ faUserCircle } color={'rgb(131, 167, 222)'} size={30} paddingBottom={0} textAlign={'center'} marginLeft={190}/> 
          <Text style={{textAlign: 'center', alignSelf: 'stretch', marginBottom: 40, fontFamily: 'shrikhand',  color: '#83A7DE',fontSize: 20}}>{item.author}</Text>
         
            <View style={styles.buttons}>
             
             {/* <Button color='rgb(131, 167, 222)' title="Delete" onPress={() => this.deletePost(item.pk)}/>
             <Button color='rgb(131, 167, 222)' title="Edit" onPress={() => this.props.navigation.navigate('Edit')}/> */}
            {/* <FontAwesomeIcon icon={ faRecordVinyl } color={'rgb(131, 167, 222)'} size={32}/> */}
             </View>
            </View>
            
          )}
          
        />
        </View>
    
 
   )
  }
  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // fontFamily: 'shrikhand',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',

  },
  buttons: {
      flex: 1,
      flexDirection: "row",
      // fontFamily: 'shrikhand',
      color: 'rgb(197, 139, 211)'
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
    borderRadius: 250/2,
    marginTop: 70,
   marginLeft: 75,
   marginRight: 100

  },
  sounddump: {
    fontSize: 40,
    // fontFamily: 'shrikhand',
    textAlign: 'center',
    // color: 'rgb(197, 139, 211)',
    color: 'rgb(131, 167, 222)',
    paddingBottom: 40
  },
 
});



