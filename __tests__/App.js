/* global it */
import 'react-native';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import HomeScreen from '../src/screens/HomeScreen';

it('renders correctly', () => {
  const tree = ReactTestRenderer.create(<HomeScreen />); // eslint-disable-line no-unused-vars
});
