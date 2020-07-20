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
                source = {require("../assets/a6.jpg")}
                style = {{position: "absolute", }}
            ></Image>
            <Image 
                source = {require("../assets/profile.jpg")}
                style = {{ bottom: -200, right: -10,borderRadius: 150}}
            ></Image>
            
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