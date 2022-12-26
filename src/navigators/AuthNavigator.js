import React, {useEffect} from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import {login, logout} from '../actions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthNavigator = () => {
  const loggedIn = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== '' && token !== undefined && token !== null) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loggedIn ? (
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
      <Stack.Screen name="Giriş" component={LoginScreen} />
    </Stack.Navigator>
  );
};
