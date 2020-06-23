
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createBottomTabNavigator } from "react-navigation-tabs";
//import {Ionicons} from '@expo/vector-icons'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import{createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PostScreen from './screens/PostScreen'
//import PostDetailScreen from './screens/PostDetailScreen'
//import NotificationScreen from './screens/NotificationScreen'
import ProfileScreen from './screens/ProfileScreen'
import { Icon } from 'react-native-elements'
// import {decode, encode} from 'base-64';
// if (!global.btoa) {
// global.btoa = encode;
// }
// if (!global.atob) {
// global.atob = decode;
// }

const AppTabNavigator = createBottomTabNavigator(
  // {
  // default: createBottomTabNavigator(
    
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="home" size={24} color={tintColor}/>
        }
      },
      // PostDetail: {
      //   screen: PostDetailScreen,
      //   navigationOptions: {
      //     tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="comments" size={24} color={tintColor}/>
      //   }
      // },
      Post: {
        screen: PostScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => 
          <Icon 
            name="add-circle-outline" 
            size={48} 
            color={tintColor} 
            style={{
              shadowColor: "E9446A" ,
              shadowOffseet: { width:0,height:0},
              shadowRadius: 10,
              shadowOpacity:0.3
            }}
            />
        }
      },
      // Notification: {
      //   screen: NotificationScreen,
      //   navigationOptions: {
      //     tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="bell"  size={24} color={tintColor}/>
      //   }
      // },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Icon type='font-awesome' name="user" size={24} color={tintColor}/>
        }
      }
    },
  
    {
      // defaultNavigationOptions: {
      //   tabBarOnPress: ({navigation, defaultHandler}) => {
      //     if(navigation.state.key == "Post"){
      //       navigation.navigate("postModel")
      //     }else{
      //       defaultHandler()
      //     }
      //   }
      // },
      tabBarOptions: {
        activeTintColor: "#161F3D",
        inactiveTintColor: "#B8BBC4",
        showLabel:false
      }
    }
  
// ),
    // postModal: {
    //   screen: PostScreen
    // }
  // } ,
  // {
  //   mode: "model",
  //   headerMode: "none",
  //   initialRouteName: "postModal"
  // } 
);


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Loading:LoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
  )
)
