import React, { Component} from 'react'
import axios from 'axios'
import { Text, Button, TextInput, View, StyleSheet, TouchableOpacity, FormData} from 'react-native'
import qs from 'qs'
import { ScrollView } from 'react-native-gesture-handler'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            pk: this.props.navigation.state
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params)
    }
   refreshList = () => {
       axios.get("http://localhost:8000/api/posts/")
       .then(res => {
        return res.json();
      })
      .then(response => {
        this.setState({ posts: response });
      })
   }
    handleSubmit = () => {
        console.log(this.state)
        // e.preventDefault()
        let posts = this.state
        return axios.post('http://localhost:8000/api/posts/', {

            'title': this.state.title,
            'link': this.state.link,
            'caption': this.state.caption
        }, {
            "headers": {
                'Content-Type': 'application/json'
            }
        })
        .then(res => 
            
            console.log(res))
        .catch(err => console.log(err))        
    
    }

    render() {
        
        return( 
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="Title"
                    name='title'
                    onChangeText={(text) => this.setState({title: text})}/>
               </View>
               <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="Image"
                    name='link'
                    onChangeText={(text) => this.setState({link: text})}/>
               </View>
               <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="Link to Song"
                    name='caption'
                    onChangeText={(text) => this.setState({caption: text})}/>
               </View>
               {/* <View style={styles.inputContainer}>
                    <TextInput style={StyleSheet.inputs}
                    placeholder="Comments"
                    name='comments'
                    onChangeText={(text) => this.setState({comments: text})}/>
               </View> */}
               <Button title="Post" style={styles.submitButtonText} onPress={() => this.handleSubmit()}/>
                
 
            </View>
        )
        }
    }



const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   input: {
      margin: 15,
      fontSize: 40,
      marginBottom : 40,
      color : 'blue'
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 60,
   },
   submitButtonText:{
     color: '#FFFFFF',
     backgroundColor: '#3462FD',
     width:350,
     height:45,
     borderRadius:10,
     justifyContent: 'center',
     alignItems: 'center'
   },
  signUpText:{
     color: '#FFFFFF',
     alignItems: 'center'
  },
  inputContainer: {
     borderBottomColor: '#05C203',
     backgroundColor: '#FFFFFF',
     borderRadius:5,
     borderBottomWidth: 1,
     width:350,
     height:45,
     marginBottom:20,
     flexDirection: 'row',
     alignItems:'center'
  },
  inputs:{
     height:45,
     marginLeft:16,
     borderBottomColor: '#FFFFFF',
     flex:1,
  },
})