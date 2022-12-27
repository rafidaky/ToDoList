import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, Input, Text} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';
import {login} from '../actions';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState('main');

  const saveToken = async token => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      dispatch(login());
    } catch (error) {
      console.error(error);
    }
  };

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(val => {
        console.log('val', val);
        auth()
          .currentUser.getIdTokenResult()
          .then(val => {
            saveToken(val.token);
            Toast.show({
              type: 'success',
              text1: 'Başarı',
              text2: 'Üyelipiniz oluşturuldu!',
            });
            setPageState('main');
            setEmail('');
            setPassword('');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Toast.show({
            type: 'info',
            text1: 'Uyarı',
            text2: 'Bu email adresi kullanılmakta, lütfen giriş yapın!',
          });
          setPageState('main');
          setEmail('');
          setPassword('');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'Bu email adresi geçersiz!',
          });
          setEmail('');
          setPassword('');
        }
        if (error.code === 'auth/network-request-failed') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'İnternet bağlantınız yok!',
          });
        }
        console.error(error);
      });
  };
  const loginToFirebase = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth()
          .currentUser.getIdTokenResult()
          .then(val => {
            saveToken(val.token);
            Toast.show({
              type: 'success',
              text1: 'Başarı',
              text2: 'Giriş Başarılı!',
            });
            setEmail('');
            setPassword('');
          });
      })
      .catch(error => {
        console.log(error.code);
        if (error.code == 'auth/wrong-password') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'Yanlış Şifre!',
          });
        }
        if (error.code == 'auth/network-request-failed') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'İnternet bağlantınız yok!',
          });
        }
        if (error.code == 'auth/user-not-found') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'Böyle bir kullanıcı bulunamadı.',
          });
        }
        if (error.code == 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'Lütfen geçerli bir e-mail adresi girin.',
          });
        }
        if (error.code == 'auth/network-request-failed') {
          Toast.show({
            type: 'error',
            text1: 'Hata',
            text2: 'İnternet bağlantınız yok!',
          });
        }
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/backgroundPattern.png')}>
      {pageState === 'main' ? (
        <>
          <Text category="h3" style={styles.title}>
            Yapılacaklar Listesi
          </Text>
          <Button
            appearance="outline"
            onPress={() => {
              setPageState('login');
            }}
            status="success"
            style={styles.button}>
            Giriş Yap
          </Button>
          <Button
            onPress={() => {
              setPageState('register');
            }}
            status="success"
            appearance="outline"
            style={styles.button}>
            Kayıt Ol
          </Button>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => {
              setPageState('main');
            }}>
            <Ionicons name="chevron-back" size={25} color="tomato" />
          </TouchableOpacity>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="E-Mail"
            value={email}
            style={styles.input}
            onChangeText={nextValue => setEmail(nextValue)}
          />
          <Input
            placeholder="Şifre"
            autoCapitalize="none"
            value={password}
            autoCorrect={false}
            secureTextEntry
            style={styles.input}
            onChangeText={nextValue => setPassword(nextValue)}
          />
          <Button
            onPress={() => {
              if (pageState === 'login') {
                loginToFirebase();
              } else if (pageState === 'register') {
                register();
              }
            }}
            style={styles.button}
            disabled={email !== '' && password !== '' ? false : true}>
            {pageState === 'login' ? 'Giriş Yap' : 'Üye Ol'}
          </Button>
        </>
      )}
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
  input: {
    marginTop: 15,
  },
  button: {
    marginTop: 30,
  },
});
