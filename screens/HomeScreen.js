import React, { Component } from 'react';
import { Alert,StyleSheet, ScrollView, ActivityIndicator, View ,Text} from 'react-native';
import { ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import { Icon ,Card, Button} from 'react-native-elements'


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

  deletePost(key) {
    const dbRef = firestore().collection('posts').doc(key)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('PostScreen');
      })
  }

  openTwoButtonAlert(key){
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deletePost(key)},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
                  title={item.title}
                  subtitle={
                    <View style={{marginTop:5}}>
                     <Text>{item.post}</Text>
                     <Text>{item.author}</Text>
                {/* <Button onPress={this.openTwoButtonAlert(item.key)} icon={<Icon type='font-awesome' name="trash"  size={24} />} />
                <Button icon={ <Icon type='font-awesome' name="edit"  size={24} />}/> */}
                  </View>
                    }
                    
                    subtitleStyle={{ paddingLeft: 20, paddingBottom:30 }}
                   // rightIcon= {<Icon type='font-awesome' name="bell"  size={24} />}
                  onPress={() => {
                     this.props.navigation.navigate('HomeScreen', {
                      userkey: item.key
                     });
                  }}/>
                  </View>
                  <View style={{flexDirection:'row',marginTop:5, marginLeft:200}}>
                <Button onPress={this.openTwoButtonAlert(item.key)} icon={<Icon type='font-awesome' name="trash"  size={24} />} />
                <Button icon={ <Icon type='font-awesome' name="edit"  size={24} />}/>
                  </View>
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