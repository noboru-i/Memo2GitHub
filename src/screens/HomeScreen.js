import React from 'react';
import { AsyncStorage, FlatList, TouchableHighlight, View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import GitHubApi from '@octokit/rest';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: []
    };

    this.onPushSetting = this.onPushSetting.bind(this);
    this.onPressIssue = this.onPressIssue.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.setTitle({ title: 'Memo to GitHub' });

    this.fetchIssues();
  }

  onPushSetting() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.push({
      screen: 'm2g.SettingScreen'
    });
  }

  onPressIssue(issue) {
    console.log(this);
    alert(`Pressed ${issue.title}`); // eslint-disable-line no-undef,no-alert
  }

  async fetchIssues() {
    const token = await AsyncStorage.getItem('auth.token');
    const owner = await AsyncStorage.getItem('setting.owner');
    const repo = await AsyncStorage.getItem('setting.repository');
    if (!owner || !repo) {
      return;
    }

    const octokit = new GitHubApi({});
    octokit.authenticate({
      type: 'token',
      token
    });
    octokit.issues
      .getForRepo({ owner, repo })
      .then(({ data }) => {
        this.setState({ issues: data });
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
          <Button block onPress={this.onPushSetting}>
            <Text>Setting</Text>
          </Button>
          <FlatList
            data={this.state.issues}
            renderItem={({ item, separators }) => (
              <TouchableHighlight
                onPress={() => this.onPressIssue(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <View style={{ backgroundColor: 'white', padding: 10 }}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={item => item.number.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#E0E0E0'
                }}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}
