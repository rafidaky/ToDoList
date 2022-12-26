import {ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';
import {deleteAllItems} from '../database/allSchemas';
import {useDispatch} from 'react-redux';
import {logout} from '../actions';
import auth from '@react-native-firebase/auth';

const MyAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const getCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      setEmail(email);
      const password = await AsyncStorage.getItem('password');
      setPassword(password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCredentials();
  }, []);

  const logOutFunction = async () => {
    try {
      auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('email');
          AsyncStorage.removeItem('password');
          deleteAllItems();
          dispatch(logout());
          console.log('User signed out!');
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/backgroundPattern.png')}>
      <Input
        editable={false}
        placeholder="E-Mail"
        label={'E-Mail'}
        value={email}
        disabled={true}
        onChangeText={nextValue => setEmail(nextValue)}
      />
      <Input
        editable={false}
        style={styles.input}
        secureTextEntry
        placeholder="Şifre"
        value={password}
        disabled={true}
        label="Şifre"
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Button
        onPress={() => {
          logOutFunction();
        }}
        style={styles.button}>
        Çıkış Yap
      </Button>
    </ImageBackground>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    padding: 33,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});
