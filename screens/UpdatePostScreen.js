import React from 'react';
import {
  StyleSheet,
  View,
  Text,TouchableOpacity,ScrollView,TextInput
} from 'react-native';
import { Icon,Button } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  Image
} from 'react-native';

export default class UpdatePostScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          key: '',
          isLoading: true,
          author:'',
            title: '',
            post: '',
            createdAt:'',
        };
      }
      componentDidMount() {
        const { navigation } = this.props;
        const ref = firestore().collection('posts').doc(this.props.navigation.getParam('boardkey'));
        ref.get().then((doc) => {
          if (doc.exists) {
            const board = doc.data();
            this.setState({
              key: doc.id,
              title: board.title,
              post: board.post,
              author: auth().currentUser.displayName,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }
   
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
      }
      
      updateBoard() {
        const updateRef = firestore().collection('posts').doc(this.state.key);
        updateRef.set({
          title: this.state.title,
          post: this.state.post,
          
          author: this.state.author,
          createdAt: new Date().getTime(),
        }).then((docRef) => {
          this.setState({
            key: '',
           // author:'',
            title: '',
            post: '',
            createdAt:'',
            isLoading: false,
          });
       //   this.props.navigation.navigate('Home');
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.setState({
            isLoading: false,
          });
        });
      }
    render(){
        return (
          <View>
            <Image 
                source = {require("../assets/a3.jpeg")}
                style = {{position: "absolute",bottom:-300, height:700,width:'100%',}}
            ></Image>
            <View style={{flexDirection:'row',marginTop:5, marginLeft:10}}>
                <Button style={{marginLeft:10,width:5}} onPress={() => this.props.navigation.navigate("Home")} icon={<Icon style={{marginLeft:10}} type='font-awesome' name="arrow-circle-left"  size={24} />} />
                
             
             <ScrollView>
             
             <View style={styles.container}>
        <View style={styles.inputGroup}>
        <TextInput
        style={{borderWidth: 1,width:250,margin: 15,backgroundColor: '#FFB6C1'}}
              placeholder={'Title'}
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
          />
          <TextInput
          style={{borderWidth: 1,width:250,margin: 15,backgroundColor: '#FFB6C1'}}
              placeholder={'Post'}
              numberOfLines={6}
              multiline={true}
              value={this.state.post}
              onChangeText={(text) => this.updateTextInput(text, 'post')}
          />
        </View>
        
        <View style={{width:100,alignItems: 'center'}}>
          <Button style={{width:10}}
            title='Update Post'
            onPress={() => this.updateBoard()} 
            color="#19AC52"
          />
        </View>
        </View>
      </ScrollView>
      </View>
      </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center'
    },
    subContainer: {
      flex: 1,
      marginBottom: 20,
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#CCCCCC',
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      width:10
    }
  })