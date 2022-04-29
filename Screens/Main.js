import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Logout from './Assets/logout.png';
import Add from './Assets/add.png';
import {signOut, getAuth} from 'firebase/auth';
import {withNavigation} from 'react-navigation'; // Version can be specified in package.json
import {Divider} from 'react-native-paper';
import {db} from '../firebase';
import {doc, getDocs, collection} from 'firebase/firestore/lite';

function Main(props) {
  const [list, setlist] = useState('');
  const [uid, setUID] = useState('');
  const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   console.log('refresh use effect performed');
  //   Getdata();
  //   const willFocusSubscription = props.navigation.addListener('focus', () => {
  //     Getdata();
  //   });

  //   willFocusSubscription;
  // }, [uid]);

  useEffect(() => {
    // Getdata();
    // setUID(props.Userid.user);
    console.log('props');
    let UserId = props.navigation.getParam('USERid');
    setUID(UserId);
    //  Getdata();
  }, [null]);

  useEffect(() => {
    setRefresh(false);
    console.log('Fetched Data');
    Getdata();
    setRefresh(false);
  }, [refresh, uid]);

  const Getdata = async () => {
    console.log('uid in getdata');
    console.log(uid);
    const docRef = doc(db, 'users', uid);
    const colRef = collection(docRef, 'Task');
    const tasksnapshot = await getDocs(colRef);
    const tasklist = tasksnapshot.docs.map((doc) => ({
      id: doc.id,
      Name: doc.data().Name,
      StartDate: doc.data().StartDate,
      EndDate: doc.data().EndDate,
      Discription: doc.data().Discription,
    }));
    setlist(tasklist);
  };

  function signout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      ToastAndroid.show('Log Out successfully!', ToastAndroid.SHORT);
      props.navigation.push('LoginRoute');
    });
  }

  // const sfRef = db.collection('users').doc('SF');
  // const collections = await sfRef.listCollections();
  // collections.forEach((collection) => {
  //   console.log('Found subcollection with id:', collection.id);
  //});
  // const task = collection(db, 'users');
  // const tasksnapshot = await getDocs(task);
  // const tasklist = tasksnapshot.docs.map((doc) => doc.data());
  // setlist(tasklist);
  // console.log(list);
  // const Userid = props.Userid.user;
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.heading}>
          <Text style={{fontSize: 30}}>Task</Text>
          <Text style={{color: '#006CF6'}}>Manager </Text>
        </View>
        {/* <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RegRoute', {
                USERid: uid,
                setRefreshFunc: setRefresh,
              })
            }>
            <Image style={{height: 30, width: 30}} source={Add} />
          </TouchableOpacity> */}
        <TouchableOpacity style={{padding: 7, marginTop: 5}} onPress={signout}>
          <Image style={{height: 23, width: 23}} source={Logout} />
        </TouchableOpacity>
      </View>
      <Divider style={{height: 1.5}} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{paddingBottom: 53}}>
        <ScrollView>
          {list.length > 0
            ? list.map((Task, key) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('DocRoute', {
                      Doci: Task.id,
                      UID: uid,
                      setRefreshFunc: setRefresh,
                    })
                  }
                  style={styles.card}>
                  <View style={styles.text}>
                    <Text style={{fontSize: 17}}>{Task.Name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
        <View style={{position: 'absolute'}}>
          <TouchableOpacity
            style={{left: 320, top: 480}}
            onPress={() =>
              props.navigation.navigate('RegRoute', {
                USERid: uid,
                setRefreshFunc: setRefresh,
              })
            }>
            <Image style={{height: 35, width: 35}} source={Add} />
          </TouchableOpacity>
        </View>
        {/* <Link
            to={{
              pathname: 'RegRoute',
            }}>
            <Text>Goto</Text>
          </Link> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    padding: 4,
    flexDirection: 'row',
  },
  addbutton: {
    backgroundColor: '#81c784',
  },
  Button: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
    backgroundColor: '#4C95FD',
  },
  ButtonOut: {
    marginTop: 2,
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
    backgroundColor: '#FC627F',
  },
  Header: {
    backgroundColor: '#30B5C9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    padding: 17,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#4C95FD',
    borderWidth: 0,
    borderRadius: 12,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
});
export default withNavigation(Main);
