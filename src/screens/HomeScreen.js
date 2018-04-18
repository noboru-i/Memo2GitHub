import React from 'react';
import { Container, Content, Button, Text } from 'native-base';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onPushAnother = this.onPushAnother.bind(this);
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.setTitle({ title: 'Memo to GitHub' });
  }

  onPushAnother() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.push({
      screen: 'm2g.SettingScreen'
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Button block onPress={this.onPushAnother}>
            <Text>Go to auth</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
