import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  let isLoggedIn = false;

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
