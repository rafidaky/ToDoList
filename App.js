import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MyAccountScreen from './src/screens/MyAccountScreen';
import {AsyncStorage} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreAllLogs();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.disableYellowBox = true;
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
    <ToastProvider offsetTop={100}>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          {isLoggedIn ? (
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;

                  if (route.name === 'Anasayfa') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Hesabım') {
                    iconName = focused ? 'person' : 'person-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}>
              <Tab.Screen
                options={{
                  headerShown: false,
                }}
                name="Anasayfa"
                component={HomeScreen}
              />
              <Tab.Screen name="Hesabım" component={MyAccountScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="LoginScreen">
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
          )}
        </ApplicationProvider>
      </NavigationContainer>
    </ToastProvider>
  );
};
export default App;
