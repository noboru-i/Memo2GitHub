// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import HomeScreen from './screens/HomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

const NextScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Next Screen!!</Text>
  </View>
);

function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => HomeScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => NextScreen);
}

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.FirstTabScreen',
    title: 'Welcome'
  }
});
