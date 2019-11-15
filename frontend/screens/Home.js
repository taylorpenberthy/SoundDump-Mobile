import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, Linking, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Font  from 'expo-font'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ActivityIndicator } from 'react-native'
import { faRecordVinyl, faUserCircle, faPlaneDeparture, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      fontsLoaded: false,
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

  
  render() {
    console.log(this.state)
   return(
     
      <View style={{ flex: 1, paddingTop: 60, }}>
      <FontAwesomeIcon icon={faPlusSquare} color={'rgb(231, 210, 141)'} size={28} marginLeft={350} onPress={() => this.props.navigation.navigate('PlayerScreen')}/>
        <Text style={styles.sounddump}>S<FontAwesomeIcon icon={ faRecordVinyl } color={'rgb(231, 210, 141)'} size={32} />undDump</Text>
      
        <FlatList
          data={this.state.posts}
          keyExtractor={({item} , index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post} >
              <Text style={{textAlign: 'center', alignSelf: 'stretch', marginBottom: 10, fontFamily: 'shrikhand', fontSize: 20, color: '#CB8589'}}>{item.title}</Text>
           {/* <FontAwesomeIcon icon={ faPlaneDeparture } color={'rgb(231, 60, 201)'} size={30} paddingBottom={0} textAlign={'right'}/>
               */}
              {/* <Text style={styles.title}>{item.title} </Text> */}
              <ImageBackground source={require('../assets/vinyl.png')} style={{width: 400, height: 400, marginLeft: 7, marginBottom: 20}}>
             <TouchableOpacity onPress={() => Linking.openURL(item.caption)}>
           <Image source={{ uri: `${item.link}`}} style={styles.album}  /></TouchableOpacity>
           {/* <Text style={styles.buttons}>User: jdklsfjlsdkjflks</Text> */}
           </ImageBackground>
          <FontAwesomeIcon icon={ faUserCircle } color={'rgb(131, 167, 222)'} size={30} paddingBottom={0} textAlign={'center'} marginLeft={190}/> 
          <Text style={{textAlign: 'center', alignSelf: 'stretch', marginBottom: 80, fontFamily: 'shrikhand',  color: '#83A7DE',fontSize: 20}}>username</Text>
           
            {/* <Text style={{color: 'rgb(131, 167, 222)', padding: 10, borderRadius: 300,}} onPress={() => Linking.openURL(item.caption)}>Open in Spotify</Text> */}
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
      paddingTop: 20
  },
  album: {
    width: 250, 
    height: 250, 
    borderRadius: 250/2,
    marginTop: 70,
   marginLeft: 75,
   marginRight: 100

  },
  // post: {
  //   flex: 1,
  //   borderWidth: 0.5,
  //   margin: 10,
  //   textAlign: 'center',
  //   paddingTop: 65,
  //   // width: 400,
  //   // height: 400,
  //   // borderRadius: 400/2,
  //   // padding: 2,
  //   // backgroundColor: '#E3E1E1',
  //   // backgroundColor: 'rgba(254, 242, 219, 0.8)',
  //   shadowColor: 'darkgrey',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   elevation: 1,
  //   borderColor: '#E3E1E1',
  //   alignItems: 'center'
  // },
  sounddump: {
    fontSize: 40,
    // fontFamily: 'shrikhand',
    textAlign: 'center',
    // color: 'rgb(197, 139, 211)',
    color: 'rgb(131, 167, 222)',
    paddingBottom: 20
  },
 
});



