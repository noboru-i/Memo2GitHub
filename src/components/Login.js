import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import Octokit from '@octokit/rest';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      token: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="user id"
          onChangeText={text => this.setState({ user_id: text })}
        />
        <TextInput
          placeholder="token"
          onChangeText={text => this.setState({ token: text })}
        />
        <Button
          onPress={this.onPressCheck.bind(this)}
          title="Check"
          disabled={!this.state.user_id || !this.state.token}
        />
      </View>
    );
  }

  onPressCheck() {
    const octokit = new Octokit();
    octokit.authenticate({
      type: 'basic',
      username: this.state.user_id,
      password: this.state.token
    });
    octokit.users
      .get({})
      .then(({ data }) => {
        alert('Hello ' + data.login + ' !!');
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
