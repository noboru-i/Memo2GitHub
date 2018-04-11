// @flow

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onPushAnother = this.onPushAnother.bind(this);
  }

  onPushAnother() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.push({
      screen: 'example.SecondTabScreen',
      title: 'Pushed Screen'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button onPress={this.onPushAnother} title="Go to details" />
        <Login />
      </View>
    );
  }
}

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

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      icon: require('../img/one.png'),
      selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      icon: require('../img/two.png'),
      selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Screen Two'
    }
  ]
});
