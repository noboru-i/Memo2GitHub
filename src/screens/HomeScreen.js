import React from 'react';
import { Container, Content, Button, Text } from 'native-base';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.onPushAnother = this.onPushAnother.bind(this);
  }

  onPushAnother() {
    // eslint-disable-next-line react/prop-types
    this.props.navigator.push({
      screen: 'm2g.AuthScreen',
      title: 'Pushed Screen'
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>This is Content Section</Text>
          <Button onPress={this.onPushAnother}>
            <Text>Go to auth</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
