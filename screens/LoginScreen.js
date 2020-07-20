import React from 'react';
import {
  StyleSheet,
  View,
  Text,Image,LayoutAnimation,StatusBar
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import * as firebase from 'firebase'
// import firebase from '../Fire';
import auth from '@react-native-firebase/auth';

export default class LoginScreen extends React.Component {
    static navigationOption = {
        header: null
    } 

    state = {
        email: "",
        password: "",
        errorMessage: null
    }


    handleLogin = () => {
        const {email, password} = this.state;

        auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}));
    }

    render(){
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
            <StatusBar style={{backgroundColor:"#414959"}}></StatusBar>
            <Image 
                source = {require("../assets/a3.jpeg")}
                style = {{position: "absolute",height:'100%',width:'100%', }}
            ></Image>
                <Text style={styles.greeting}>{'Hello again.\nWelcome back.'}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Enter Email</Text>
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
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style={{ alignSelf: "center", marginTop: 32}}
                 onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{color: "#FFF5EE", fontSize: 13}}>
                        New to NoticeApp? <Text style={{ fontWeight: "500",color: "#E9446A"}}>Signup here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#414959"
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color:"#FF00FF"
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
         color: "#F4A460",
        fontSize: 15,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#FFF5EE"
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