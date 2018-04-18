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
      token: ''
    };
    this.onPressCheck = this.onPressCheck.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('auth.token').then(data => {
      if (data) {
        this.setState({ token: data });
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
      })
      .catch(error => {
        console.log(error);
        alert('Failed to Authenticate. Please recheck token.'); // eslint-disable-line no-undef,no-alert
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
            <Text>Go to auth</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
