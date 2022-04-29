import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {db} from '../firebase';
import {doc, setDoc, addDoc, collection} from 'firebase/firestore/lite';
import DatePicker from 'react-native-datepicker';
import {Divider} from 'react-native-paper';
function Registration(props) {
  const [name, setName] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [disc, setDisc] = useState('');
  const [uid, setUID] = useState('');
  useEffect(() => {
    let UserId = props.navigation.getParam('USERid');
    setUID(UserId);
    console.log('register', uid);
  });

  const DismisKeyboard = ({children}) => {
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>;
  };

  function addTodo() {
    const docRef = doc(db, 'users', uid);
    const colRef = collection(docRef, 'Task');
    addDoc(colRef, {
      Name: name,
      StartDate: startdate,
      EndDate: enddate,
      Discription: disc,
    });
    setDisc('');
    setName('');
    setEndDate('');
    setStartDate('');
    const refreshFunc = props.navigation.getParam('setRefreshFunc');
    refreshFunc(true);
    ToastAndroid.show('Task Added successfully!', ToastAndroid.SHORT);
    props.navigation.goBack();
  }
  // addDoc(collection(db, 'Task'), {
  //   Name: name,
  //   StartDate: startdate,
  //   EndDate: enddate,
  //   Discription: disc,
  // });
  // console.log('addTodo Called!');

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <View style={styles.heading}>
        <Text style={{fontSize: 30}}>Task</Text>
        <Text style={{color: '#006CF6'}}>Manager </Text>
      </View>
      <Divider style={{height: 1.5}} />
      <SafeAreaView>
        <ScrollView>
          <Text style={{textAlign: 'center', fontSize: 23}}>
            Add Your Goal!
          </Text>

          <View>
            <Text style={{marginLeft: 10, fontSize: 16, marginTop: 10}}>
              Enter Task Name:
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Task Name"
              style={styles.input}
            />
          </View>
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{marginLeft: 15, fontSize: 16}}>Start Date:</Text>
            <Text style={{marginRight: 85, fontSize: 16}}>End Date:</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 10}}>
              <DatePicker
                date={startdate} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="start date"
                format="DD-MM-YYYY"
                minDate="01-01-1916"
                maxDate="01-01-2039"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: '#1273de',
                    borderRadius: 6,
                    marginLeft: 36,
                  },
                }}
                onDateChange={(startdate) => {
                  setStartDate(startdate);
                }}
              />
            </View>
            <View style={{marginLeft: 50, marginBottom: 10}}>
              <DatePicker
                date={enddate} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="end date"
                format="DD-MM-YYYY"
                minDate="01-01-1916"
                maxDate="01-01-2039"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: '#1273de',
                    borderRadius: 6,
                    marginLeft: 36,
                  },
                }}
                onDateChange={(enddate) => {
                  setEndDate(enddate);
                }}
              />
            </View>
          </View>
          <View>
            <Text style={{fontSize: 17, marginLeft: 10}}>Enter Detail :</Text>

            <TextInput
              value={disc}
              multiline
              onChangeText={(text) => setDisc(text)}
              numberOfLines={5}
              placeholder="Discription"
              style={styles.detail}
              returnKeyType="done"
            />
          </View>
          <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <TouchableOpacity onPress={addTodo} style={styles.button}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  detail: {
    textAlignVertical: 'top',
    margin: 12,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#1273de',
    padding: 12,
    borderRadius: 6,
  },
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
  dateinput: {
    width: 150,
    height: 40,
    margin: 12,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1273de',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },

  date1PickerStyle: {
    width: 150,
    marginBottom: 10,
    marginLeft: 10,
  },
  datePickerStyle: {
    width: 150,
    marginLeft: 40,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color: '#000',
  },
});
export default Registration;
