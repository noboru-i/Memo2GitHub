/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './components/Login';

class HomeScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Next')}
          title="Go to details"
        />
        <Login />
      </View>
    );
  }
}

class NextScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Next Screen!!</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: HomeScreen },
  Next: { screen: NextScreen }
});

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
