import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  BackHandler,
  Text,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {HeaderTitle, ScrollView} from 'react-navigation';
import {Divider} from 'react-native-paper';
import {db} from '../firebase';
import {
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  collection,
  setDoc,
} from 'firebase/firestore/lite';
function UpdateDoc(props) {
  const [name, setName] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [disc, setDisc] = useState('');
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
  }, [uid, docid]);

  useEffect(() => {
    if (docid && uid != null) {
      GetDoc();
    }
  }, [docid, uid]);
  useEffect(() => {
    setdata();
  }, [list]);

  const GetDoc = async () => {
    console.log('Get Doc Function Called');
    const docRef = doc(db, 'users', uid, 'Task', docid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setlist(setdata);
    console.log('Settings updated');

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

  function setdata() {
    console.log('Setting Called');
    setName(list.Name);
    setStartDate(list.StartDate);
    setEndDate(list.EndDate);
    setDisc(list.Discription);
  }
  //   useEffect(
  //     () => {
  //       if (docid && uid != null) {
  //         Getdata();
  //       }
  //     },
  //     [uid],
  //     [docid],
  //   );
  const Getdata = async () => {
    const docRef = doc(db, 'users', uid, 'Task', docid);
    const docSnap = await setDoc(docRef, {
      Name: name,
      StartDate: startdate,
      EndDate: enddate,
      Discription: disc,
    });
    const refreshFunc = props.navigation.getParam('setRefreshFunc');
    refreshFunc(true);
    ToastAndroid.show('Task Updated successfully!', ToastAndroid.SHORT);
    props.navigation.goBack();
  };
  const DismisKeyboard = ({children}) => {
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>;
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
        <ScrollView>
          <View style={{padding: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 22}}>Details</Text>
            </View>
          </View>
          <Divider style={{height: 1.5}} />
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 10, fontSize: 16, marginTop: 17}}>
              Task Name:
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Task Name"
              style={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingRight: 10,
                marginLeft: 10,
                fontSize: 16,
                marginTop: 17,
              }}>
              Start Date:
            </Text>
            <TextInput
              value={startdate}
              onChangeText={(text) => setStartDate(text)}
              placeholder="Start Date"
              style={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                marginTop: 17,
                paddingRight: 16,
              }}>
              End Date:
            </Text>
            <TextInput
              value={enddate}
              onChangeText={(text) => setEndDate(text)}
              placeholder="End Date"
              style={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingRight: 2,
                marginLeft: 10,
                fontSize: 16,
                marginTop: 17,
              }}>
              Discription:
            </Text>
            <TextInput
              value={disc}
              onChangeText={(text) => setDisc(text)}
              placeholder="Discription"
              style={styles.input}
            />
          </View>

          <View style={styles.Delete}>
            <TouchableOpacity style={styles.Button} onPress={Getdata}>
              <Text style={{color: '#FFFFFF'}}>Submit Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: '#03b365',
  },
  input: {
    width: 240,
    height: 40,
    margin: 10,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
});
export default UpdateDoc;
