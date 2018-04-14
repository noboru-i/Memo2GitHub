// @flow

import { Navigation } from 'react-native-navigation';

import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';

function registerScreens() {
  Navigation.registerComponent('m2g.HomeScreen', () => HomeScreen);
  Navigation.registerComponent('m2g.AuthScreen', () => AuthScreen);
}

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'm2g.HomeScreen',
    title: 'Welcome'
  }
});
