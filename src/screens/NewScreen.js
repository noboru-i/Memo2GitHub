/* global fetch */

import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon
} from 'native-base';
import GitHubApi from '@octokit/rest';

import HTMLParser from 'fast-html-parser';

export default class NewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      title: '',
      body: ''
    };

    // eslint-disable-next-line react/prop-types
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onCreateButton = this.onCreateButton.bind(this);
    this.onPressGlobe = this.onPressGlobe.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.setTitle({ title: 'Create new issue' });
    // eslint-disable-next-line react/prop-types
    this.props.navigator.setButtons({
      leftButtons: [{ title: 'close', id: 'close' }]
    });
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        // eslint-disable-next-line react/prop-types
        this.props.navigator.dismissModal();
      }
    }
  }

  async onCreateButton() {
    const token = await AsyncStorage.getItem('auth.token');
    const owner = await AsyncStorage.getItem('setting.owner');
    const repo = await AsyncStorage.getItem('setting.repository');
    if (!owner || !repo) {
      return;
    }

    const labels = [];
    const octokit = new GitHubApi({});
    octokit.authenticate({
      type: 'token',
      token
    });
    octokit.issues
      .create({
        owner,
        repo,
        title: this.state.title,
        body: this.state.body,
        labels
      })
      .then(({ data }) => {
        console.log(data);
        Alert.alert('Created!', null, [
          // eslint-disable-next-line react/prop-types
          { text: 'OK', onPress: () => this.props.navigator.pop() }
        ]);
      })
      .catch(error => {
        console.log(error);
        alert('Failed to get issues. Please check network.'); // eslint-disable-line no-undef,no-alert
      });
  }

  async onPressGlobe() {
    try {
      console.log('onPressGlobe');
      const response = await fetch(this.state.url, {
        redirect: 'follow'
      });
      const text = await response.text();
      if (!text) {
        console.log('cannot get text');
        return;
      }

      const dom = new HTMLParser.parse(text); // eslint-disable-line new-cap
      const titleDom = dom.querySelector('head title');
      const title = titleDom.text;
      const body = `## URL
${title}

## Content
`;
      this.setState({ title, body });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#fff' }}>
          <Form>
            <Item inlineLabel>
              <Label>url</Label>
              <Input
                onChangeText={text => this.setState({ url: text })}
                value={this.state.url}
              />
              <Icon active name="globe" onPress={this.onPressGlobe} />
            </Item>
            <Item inlineLabel>
              <Label>title</Label>
              <Input
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </Item>
            <Item inlineLabel style={{ height: 200 }}>
              <Label>body</Label>
              <Input
                multiline
                onChangeText={text => this.setState({ body: text })}
                value={this.state.body}
                style={{ height: 200 }}
              />
            </Item>
          </Form>
          <Text />
          <Button block onPress={this.onCreateButton} style={{ margin: 10 }}>
            <Text>Create</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
