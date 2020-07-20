import React from 'react';
import {
  StyleSheet,
  View,
  Text,Image,StatusBar
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import * as firebase from 'firebase';
//import firebase from '../Fire';
import auth from '@react-native-firebase/auth';
// import {Ionicons} from '@expo/vector-icons'

export default class RegisterScreen extends React.Component {
    static navigationOption = {
        header: null
    } 

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }


    handleSignUp = () => {

        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            });
        })
        .catch(error => this.setState({errorMessage: error.message}));
    };

    render(){
        return (
            <View style={styles.container}>
            <StatusBar barStyle="light-content"></StatusBar>
            <Image 
                source = {require("../assets/a4.jpg")}
                style = {{position: "absolute", height:'100%',width:'100%',}}
            ></Image>
            {/* <TouchableOpacity>
                <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>    
            </TouchableOpacity> */}
                {/* <Text style={styles.greeting}>{'Hello.\nSign up to get Started.'}</Text> */}

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none"
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={{marginTop: 32}}>Email Address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        ></TextInput>
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input} 
                        secureTextEntry autoCapitalize="none"
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style={{ alignSelf: "center", marginTop: 32}}
                 onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{color: "#414959", fontSize: 13}}>
                        New to SocialApp? <Text style={{ fontWeight: "500",color: "#E9446A"}}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        //color: "#8A8F9E",
        fontSize: 15,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
       // color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});