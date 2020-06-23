import React from 'react';
import {
  StyleSheet,View,Text, ActivityIndicator, TouchableOpacity,LayoutAnimation,Image} from 'react-native';
  import firebase from '@react-native-firebase/app';

export default class ProfileScreen extends React.Component {

    state = {
        email: "",
        displayName: ""
    };
    componentDidMount(){
        const {email,displayName} = firebase.auth().currentUser;

        this.setState({email,displayName});
    }
    signOutUser = () => {
        firebase.auth().signOut();
    }

    render(){
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>

            <Image 
                source = {require("../assets/a.jpg")}
                style = {{position: "absolute", bottom: -225, right: -225}}
            ></Image>
            <Image 
                source = {require("../assets/profile.jpg")}
                style = {{ bottom: -200, right: -10}}
            ></Image>
            {/* <Image 
                source = {require("../assets/abc.jpg")}
                style = {{ bottom: -225, right: -25,borderRadius: 50}}
            ></Image> */}
                <Text style={styles.email}>Hi {this.state.email}!</Text>

                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  justifyContent: "center",
        alignItems:"center",
        
    },
    logout:{
        bottom: 270,
        right: -140,
        marginTop: 32,
        backgroundColor: "#ADD8E6"
    },
    email: {
        bottom: 120,
        fontSize: 23,
        color: "#800080"
    }

});