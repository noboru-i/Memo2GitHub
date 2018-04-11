import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Login from '../components/Login';

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

export default class HomeScreen extends React.Component {
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
