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
  Label
} from 'native-base';
import GitHubApi from '@octokit/rest';

export default class NewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    // eslint-disable-next-line react/prop-types
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onCreateButton = this.onCreateButton.bind(this);
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

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>title</Label>
              <Input
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </Item>
            <Item stackedLabel style={{ height: 200 }}>
              <Label>body</Label>
              <Input
                multiline
                onChangeText={text => this.setState({ body: text })}
                value={this.state.body}
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
