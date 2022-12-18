import {ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '@ui-kitten/components';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 33,
      }}
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
        style={styles.button}
        disabled={email !== '' && password !== '' ? false : true}>
        Giriş Yap
      </Button>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
