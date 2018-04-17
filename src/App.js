// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleProvider, Root, getTheme } from 'native-base';

import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';

function wrap(WrappedComponent) {
  return props => (
    <StyleProvider style={getTheme()}>
      <Root>
        <WrappedComponent {...props} />
      </Root>
    </StyleProvider>
  );
}

function registerScreens() {
  Navigation.registerComponent('m2g.HomeScreen', () => wrap(HomeScreen));
  Navigation.registerComponent('m2g.AuthScreen', () => wrap(AuthScreen));
}

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'm2g.HomeScreen',
    title: 'Welcome'
  }
});
