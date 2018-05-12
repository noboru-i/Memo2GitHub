import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label
} from 'native-base';

import GitHubApi from '@octokit/rest';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      owner: '',
      repository: ''
    };
    this.onPressCheck = this.onPressCheck.bind(this);
    this.onPressApply = this.onPressApply.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('auth.token').then(data => {
      if (data) {
        this.setState({ token: data });
      }
    });
    AsyncStorage.getItem('setting.owner').then(data => {
      if (data) {
        this.setState({ owner: data });
      }
    });
    AsyncStorage.getItem('setting.repository').then(data => {
      if (data) {
        this.setState({ repository: data });
      }
    });

    // eslint-disable-next-line react/prop-types
    this.props.navigator.setTitle({ title: 'Auth Setting' });
  }

  onPressCheck() {
    const octokit = new GitHubApi({});
    octokit.authenticate({
      type: 'token',
      token: this.state.token
    });
    octokit.users
      .get({})
      .then(({ data }) => {
        alert(`Hello ${data.login} !!`); // eslint-disable-line no-undef,no-alert
        AsyncStorage.setItem('auth.token', this.state.token);
        this.setState({ owner: data.login });
      })
      .catch(error => {
        console.log(error);
        alert('Failed to Authenticate. Please recheck token.'); // eslint-disable-line no-undef,no-alert
      });
  }

  onPressApply() {
    const octokit = new GitHubApi({});
    octokit.authenticate({
      type: 'token',
      token: this.state.token
    });
    octokit.repos
      .get({
        owner: this.state.owner,
        repo: this.state.repository
      })
      .then(({ data }) => {
        if (!data.issues_url) {
          alert(`no issue`); // eslint-disable-line no-undef,no-alert
          return;
        }

        AsyncStorage.setItem('setting.owner', this.state.owner);
        AsyncStorage.setItem('setting.repository', this.state.repository);
        alert(`Applied!`); // eslint-disable-line no-undef,no-alert
      })
      .catch(error => {
        console.log(error);
        alert('Failed to get repository. Please recheck owner/repository.'); // eslint-disable-line no-undef,no-alert
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel last>
              <Label>token</Label>
              <Input
                onChangeText={text => this.setState({ token: text })}
                value={this.state.token}
              />
            </Item>
          </Form>
          <Button
            block
            style={{ margin: 10, marginTop: 30 }}
            onPress={this.onPressCheck}
            disabled={!this.state.token}
          >
            <Text>Check auth</Text>
          </Button>

          <Form style={{ marginTop: 30 }}>
            <Item stackedLabel>
              <Label>owner</Label>
              <Input
                onChangeText={text => this.setState({ owner: text })}
                value={this.state.owner}
              />
            </Item>
            <Item stackedLabel last>
              <Label>repository</Label>
              <Input
                onChangeText={text => this.setState({ repository: text })}
                value={this.state.repository}
              />
            </Item>
          </Form>
          <Button
            block
            style={{ margin: 10, marginTop: 30 }}
            onPress={this.onPressApply}
            disabled={!this.state.owner || !this.state.repository}
          >
            <Text>Apply repository</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
