import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/reducers/index';
import {AuthNavigator} from './src/navigators/AuthNavigator';
const store = createStore(reducer);

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthNavigator />
        </ApplicationProvider>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};
export default App;
