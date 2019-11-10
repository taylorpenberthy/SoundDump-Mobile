import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { WebView } from 'react-native-webview';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    return fetch('http://localhost:8000/api/posts/')
      .then(res => {
        return res.json();
      })
      .then(response => {
        this.setState({ posts: response });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
        // <View>
        // <WebView 
        // originWhitelist={['*']}source={{ html: 'https://open.spotify.com/embed/track/1RMJOxR6GRPsBHL8qeC2ux' }} />
        
      <View style={{ flex: 1, paddingTop: 80 }}>
        <Text style={styles.sounddump}>SoundDump</Text>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.title}>{item.title} </Text>
              <Image source={{uri: 'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg'}}/>
            <Text>Open in Spotify</Text>
             
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  post: {
    flex: 1,
    borderWidth: 0.5,
    margin: 15,
    padding: 5,
    backgroundColor: '#E3E1E1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderColor: 'black',
    alignItems: 'center'
  },
  sounddump: {
    textAlign: 'center',
    fontSize: 40
  }
});
