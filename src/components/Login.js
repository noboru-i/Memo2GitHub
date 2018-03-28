import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import Octokit from '@octokit/rest';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('auth.token').then(data => {
      if (data) {
        this.setState({ token: data });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="token"
          onChangeText={text => this.setState({ token: text })}
          value={this.state.token}
        />
        <Button
          onPress={this.onPressCheck.bind(this)}
          title="Check"
          disabled={!this.state.token}
        />
      </View>
    );
  }

  onPressCheck() {
    const octokit = new Octokit();
    octokit.authenticate({
      type: 'token',
      token: this.state.token
    });
    octokit.users
      .get({})
      .then(({ data }) => {
        alert('Hello ' + data.login + ' !!');
        AsyncStorage.setItem('auth.token', this.state.token);
      })
      .catch(error => {
        if (error.code === 401) {
          alert('Failed to Authenticate. Please recheck user id and token.');
        }
      });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
