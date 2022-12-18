import {ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveToken = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  };

  const createRandomToken = () => {
    // Generate a random 16-digit number.
    const randomNumber = Math.random().toString(36).substr(2, 16);
    saveToken(randomNumber);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/backgroundPattern.png')}>
      <Input
        placeholder="E-Mail"
        value={email}
        onChangeText={nextValue => setEmail(nextValue)}
      />
      <Input
        placeholder="Şifre"
        value={password}
        onChangeText={nextValue => setPassword(nextValue)}
      />
      <Button
        onPress={() => {
          createRandomToken();
        }}
        style={styles.button}
        disabled={email !== '' && password !== '' ? false : true}>
        Giriş Yap
      </Button>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 33,
  },
});
