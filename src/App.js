// @flow

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './components/Login';

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

const HomeScreen = props => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Native!</Text>
    <Button
      onPress={() => props.navigation.navigate('Next')} // eslint-disable-line react/prop-types
      title="Go to details"
    />
    <Login />
  </View>
);

const NextScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Next Screen!!</Text>
  </View>
);

export default StackNavigator({
  Home: { screen: HomeScreen },
  Next: { screen: NextScreen }
});
