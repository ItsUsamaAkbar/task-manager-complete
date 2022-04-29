import React, {useState, Component, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Login from './Login';
import {Divider} from 'react-native-paper';
import validator from 'validator';
import {auth} from '../firebase';
import {db} from '../firebase';
import {doc, setDoc, addDoc, collection} from 'firebase/firestore/lite';
import {createUserWithEmailAndPassword} from 'firebase/auth';
function Singup(props) {
  const [sinedin, setSingin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailerr, setEmailerror] = useState('');
  const [passworderr, setPassworderror] = useState('');

  function submit() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((register) => {
        setDoc(doc(db, 'users', register.user.uid), {
          Name: username,
          UID: register.user.uid,
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-exists':
          case 'auth/invalid-email':
            setEmailerror('Your E-mail or Password is badly formatted');
            break;
          case 'auth/weak-password':
            setPassworderror(err.message);
        }
      });
    ToastAndroid.show('User Created successfully!', ToastAndroid.SHORT);

    props.navigation.navigate('LoginRoute');
    console.log('user created');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View style={styles.heading}>
              <Text style={{fontSize: 30}}>Task</Text>
              <Text style={{color: '#006CF6'}}>Manager </Text>
            </View>
            <Divider style={{height: 1.5}} />
            <View style={styles.Title}>
              <Text
                style={{
                  fontSize: 35,
                  color: 'black',
                  borderRadius: 10,
                  borderColor: '#006CF6',
                  borderWidth: 2,
                  paddingRight: 20,
                  paddingLeft: 20,
                }}>
                Sign Up!
              </Text>
            </View>
            <View>
              <Text style={{marginLeft: 10, fontSize: 16, marginTop: 10}}>
                Enter User-Name:
              </Text>
              <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={{marginLeft: 10, fontSize: 16, marginTop: 10}}>
                Enter E-mail:
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="E-mail"
                style={styles.input}
              />
            </View>
            <Text style={{color: 'red', marginLeft: 10}}>{emailerr}</Text>

            <View>
              <Text style={{marginLeft: 10, fontSize: 16}}>
                Enter Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                style={styles.input}
              />
            </View>
            <Text style={{color: 'red', marginLeft: 10}}>{passworderr}</Text>

            <View
              style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
              <TouchableOpacity onPress={submit} style={styles.button}>
                <Text style={{color: 'white'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
  Title: {
    marginTop: 15,
    alignSelf: 'center',
    padding: 6,
    flexDirection: 'row',
  },
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

export default Singup;
