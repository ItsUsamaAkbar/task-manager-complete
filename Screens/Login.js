import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {auth} from '../firebase';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Keyboard,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
function Login(props) {
  const [email, setEmail] = useState('usama@gmail.com');
  const [uid, setUID] = useState('');
  const [password, setPassword] = useState('walker123');
  const [emailerr, setEmailerror] = useState('');
  const [passworderr, setPassworderror] = useState('');
  const [sinedin, setSingin] = useState(false);

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((register) => {
        console.log(register.user.uid);
        setUID(register.user.uid);
        console.log('navigating to main');
        ToastAndroid.show('Login successfully!', ToastAndroid.SHORT);
        props.navigation.navigate('HomeRoute', {
          USERid: register.user.uid,
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setEmailerror('Your E-mail or Password is incorrect');
            break;
          case 'Wrong Password':
            setPassworderror(err.message);
        }
      });
    console.log('user created');
  }

  const DismisKeyboard = ({children}) => {
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>;
  };

  const Userid = {user: uid};
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* <SafeAreaView> */}
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
                Log In
              </Text>
            </View>
            <View>
              <Text style={{marginLeft: 10, fontSize: 16, marginTop: 10}}>
                Enter E-mail:
              </Text>
              <TextInput
                returnKeyType="done"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="E-mail"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={{marginLeft: 10, fontSize: 16}}>
                Enter Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                returnKeyType="done"
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                style={styles.input}
              />
            </View>
            <Text style={{color: 'red', marginLeft: 10}}>{emailerr}</Text>

            <View style={{marginLeft: 15}}>
              <TouchableOpacity
                style={{color: '#006CF6'}}
                onPress={() => props.navigation.navigate('SignUpRoute')}>
                <Text style={{color: '#006CF6'}}>
                  {' '}
                  Doesn't have an Account?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
              <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={{color: 'white'}}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </ScrollView>
        {/* </SafeAreaView> */}
      </ScrollView>
      <Text
        style={{
          alignSelf: 'center',
          color: '#8A8B8B',
          padding: 10,
          fontSize: 12,
        }}>
        Note: Make Sure that your device is connected to Internet.
      </Text>
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

export default Login;
