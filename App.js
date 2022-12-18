import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import {AsyncStorage} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== '' && token !== undefined && token !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        {isLoggedIn ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        )}
      </ApplicationProvider>
    </NavigationContainer>
  );
};

export default App;
