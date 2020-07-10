import React, { Component } from 'react';
import { Alert,StyleSheet, ScrollView, ActivityIndicator, View ,Text,Image} from 'react-native';
import { ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { Icon ,Card, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';


class HomeScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firestore().collection('posts').orderBy('createdAt', 'desc');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  updatePost() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firestore().collection('posts').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        email: '',
        mobile: '',
        isLoading: false,
      });
    //  this.props.navigation.navigate('UserScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firestore().collection('posts').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { title,post,author,createdAt } = res.data();
      userArr.push({
        key: res.id,
        res,
        title,
        author,
        post,
        createdAt,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
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
      <ScrollView style={styles.container}>
          {
            this.state.userArr.map((item, i) => {
              return (
                <Card style={styles.card}>
                <View style={styles.listitem}>
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  // title={item.author}
                  subtitle={
                    <View>
                      
                      <Image 
                source = {require("../assets/profile.jpg")}
                style = {{ width: 50,marginTop:-60,marginLeft:-30,
                  height: 50,
                  borderRadius: 10,}}
            ></Image>
                    <Text style={{marginTop:-40,marginLeft:30}}>{item.author}</Text>
                     <Text style={{marginTop:20,fontWeight: "bold",marginLeft:30,color: 'green',fontSize:18}}>{item.title}</Text>
                     <Text style={{marginTop:5,marginLeft:30}}>{item.post}</Text>
                  </View>
                    }
                    
                    subtitleStyle={{ paddingLeft: 20, paddingBottom:30 }}
                  onPress={() => {
                     this.props.navigation.navigate('HomeScreen', {
                      userkey: item.key
                     });
                  }}/>
                  </View>
                  {/* if(item.author == auth().currentUser.displayName){ */}
                  {
                    item.author == auth().currentUser.displayName ?
                <View style={{flexDirection:'row',marginTop:5, marginLeft:200}}>
                <Button onPress={() => this.deleteBoard(item.key)} icon={<Icon type='font-awesome' name="trash"  size={24} />} />
                <Button onPress={() => {
                  this.props.navigation.navigate('UpdatePost',{boardkey: item.key});
            }} icon={ <Icon type='font-awesome' name="edit"  size={24} />}/>
            
            
                  </View> :<View></View>
                   } 
                  </Card>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,
   backgroundColor: '#FFB6C1'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listitem: {
   // backgroundColor: '#FFB6C1',
     width: 300,
     marginLeft: 10,
     marginTop: 20,
     
  },
  post: {
    padding: 20
  },
  card: {
    backgroundColor: "#eeeeee"
  }
})

export default HomeScreen;