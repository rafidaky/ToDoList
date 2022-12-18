import {ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Button} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';
import {deleteAllItems} from '../database/allSchemas';

const MyAccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      deleteAllItems();
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
          logOut();
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
