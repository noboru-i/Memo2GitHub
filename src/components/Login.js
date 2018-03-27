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

  componentDidMount() {
    const octokit = new Octokit();
    octokit.repos
      .getForOrg({
        org: 'octokit',
        type: 'public'
      })
      .then(({ data }) => {
        console.log(data);
        this.setState({ data: data });
      });
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
        <Button onPress={this.onPressCheck.bind(this)} title="Check" />
      </View>
    );
  }

  onPressCheck() {
    console.log('press!!!!' + this.state.token);
    const octokit = new Octokit();
    octokit.authenticate({
      type: 'basic',
      username: this.state.user_id,
      password: this.state.token
    });
    octokit.users.get({}).then(({ data }) => {
      console.log(data.login);
      alert('Hello ' + data.login + ' !!');
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
