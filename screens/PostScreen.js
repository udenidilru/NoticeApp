import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class PostScreen extends Component {
  constructor() {
    super();
    this.dbRef = firestore().collection('posts');
    this.state = {
      author: auth().currentUser.displayName,
      title: '',
      post: '',
      createdAt:'',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storePost() {
    if(this.state.post === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        author:this.state.author,
        title: this.state.title,  
        post: this.state.post,
        createdAt: new Date().getTime(),
      }).then((res) => {
        this.setState({
            author:'',
          title: '',
          post: '',
          createdAt:'',
          isLoading: false,
        });
      //  this.props.navigation.navigate('HomeScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView >
      <View style={styles.container}>
        <View style={styles.inputGroup}>
        <TextInput
        style={{borderWidth: 1,width:250,margin: 15,}}
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(val) => this.inputValueUpdate(val, 'title')}
          />
          <TextInput
          style={{borderWidth: 1,width:250,margin: 15,}}
              placeholder={'Post'}
              numberOfLines={4}
              multiline={true}
              value={this.state.post}
              onChangeText={(val) => this.inputValueUpdate(val, 'post')}
          />
        </View>
        
        <View style={{width:100,alignItems: 'center'}}>
          <Button
            title='Add Post'
            onPress={() => this.storePost()} 
            color="#19AC52"         />
        </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: 'center'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PostScreen;