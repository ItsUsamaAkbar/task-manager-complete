import React, {useState, Component, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {db} from '../firebase';
import {doc, getDoc, collection} from 'firebase/firestore/lite';
import {withNavigation} from 'react-navigation';
function Home(props) {
  const [list, setlist] = useState('');
  const [uid, setUID] = useState('');

  // useEffect(() => {
  //   console.log('refresh use effect performed');
  //   Getdata();
  //   const willFocusSubscription = props.navigation.addListener('focus', () => {
  //     Getdata();
  //   });

  //   willFocusSubscription;
  // }, [uid]);

  useEffect(() => {
    //Getdata();
    // setUID(props.Userid.user);
    console.log('props');
    let UserId = props.navigation.getParam('USERid');
    setUID(UserId);
    //  Getdata();
  }, [null]);

  useEffect(() => {
    console.log('Fetched Data');
    Getdata();
  }, [uid]);

  const Getdata = async () => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setlist(setdata);
    console.log('list is', list);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{justifyContent: 'center', height: 530}}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Image
              style={{height: 240, width: 290}}
              source={require('./Assets/Getstart.jpg')}
            />
          </View>
          <View style={{padding: 10}}>
            <Text style={{textAlign: 'center', fontSize: 24}}>
              Welcome! {list.Name}
            </Text>
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                paddingRight: 50,
                paddingLeft: 50,
                fontSize: 20,
              }}>
              Manage and Priotrize Your Task Easily
            </Text>
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                paddingRight: 30,
                paddingLeft: 30,
                fontSize: 14,
              }}>
              Increase Your productivity by managing your personal and team task
              and do them based on the highest priority
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Button
              style={{alignItems: 'center'}}
              title="Get Started"
              onPress={() =>
                props.navigation.navigate('MainRoute', {
                  USERid: uid,
                })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
    marginTop: 15,
  },
  Heading: {
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
  },
});
export default withNavigation(Home);
