import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import {HeaderTitle} from 'react-navigation';
import {Divider} from 'react-native-paper';
import {db} from '../firebase';
import {doc, deleteDoc, getDoc} from 'firebase/firestore/lite';
function Document(props) {
  const [docid, setDocid] = useState('');
  const [uid, setUID] = useState('');
  const [list, setlist] = useState('');
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    let Docid = props.navigation.getParam('Doci');
    let UID = props.navigation.getParam('UID');
    setDocid(Docid);
    setUID(UID);
    console.log('Document', docid);
    console.log('User', uid);
  }, [null]);

  useEffect(
    () => {
      if (docid && uid != null) {
        Getdata();
        setRefresh(false);
      }
    },
    [uid, refresh],
    [docid],
  );
  const Getdata = async () => {
    const docRef = doc(db, 'users', uid, 'Task', docid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setlist(setdata);
    console.log('list is', list);
    // const docRef = doc(db, 'users', uid);
    // const colRef = collection(docRef, 'Task', docid);
    // const tasksnapshot = await getDocs(colRef);
    // const tasklist = tasksnapshot.docs.map((doc) => ({
    //   Name: doc.data().Name,
    //   StartDate: doc.data().StartDate,
    //   EndDate: doc.data().EndDate,
    //   Discription: doc.data().Discription,
    // }));
    // setlist(tasklist);
    // console.log('Task List is' + tasklist);
  };
  function handleBackButtonClick() {
    const refreshFunc = props.navigation.getParam('setRefreshFunc');
    refreshFunc(true);
    props.navigation.goBack();

    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const Delete = async () => {
    const docRef = doc(db, 'users', uid, 'Task', docid);
    const docSnap = await deleteDoc(docRef);
    const refreshFunc = props.navigation.getParam('setRefreshFunc');
    ToastAndroid.show('Task Deleted successfully!', ToastAndroid.SHORT);
    refreshFunc(true);
    props.navigation.goBack();
  };

  return (
    <>
      <HeaderTitle>
        <View style={styles.heading}>
          <Text style={{fontSize: 30}}>Task</Text>
          <Text style={{color: '#006CF6'}}>Manager </Text>
        </View>
      </HeaderTitle>

      <Divider style={{height: 1.5}} />

      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <View style={{padding: 10}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 22}}>Details</Text>
          </View>
        </View>
        <Divider style={{height: 1.5}} />
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 10, marginTop: 10}}>
            <Text style={{fontSize: 17}}>Name:</Text>
            <Text style={{fontSize: 17}}>Start Date:</Text>
            <Text style={{fontSize: 17}}>End Date:</Text>
            <Text style={{fontSize: 17}}>Discription:</Text>
          </View>
          <View
            style={{
              paddingTop: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 17}}>{list.Name}</Text>
            <Text style={{fontSize: 17}}>{list.StartDate}</Text>
            <Text style={{fontSize: 17}}>{list.EndDate}</Text>
            <Text style={{marginRight: 0, fontSize: 17}}>
              {list.Discription}
            </Text>
          </View>
        </View>

        <View style={styles.Delete}>
          <TouchableOpacity style={styles.Button} onPress={Delete}>
            <Text style={{color: '#000000'}}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Delete}>
          <TouchableOpacity
            style={styles.Update}
            onPress={() =>
              props.navigation.navigate('UpdateDocRoute', {
                Doci: docid,
                UID: uid,
                setRefreshFunc: setRefresh,
              })
            }>
            <Text style={{color: '#000000'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Button: {
    marginTop: 15,
    alignItems: 'center',
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FB4C54',
  },
  Update: {
    marginTop: 15,
    alignItems: 'center',
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFA145',
  },
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
});
export default Document;
