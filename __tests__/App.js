/* global it */
import 'react-native';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import HomeScreen from '../src/screens/HomeScreen';

it('renders correctly', () => {
  const mockNavigator = { setTitle: () => {} };
  // eslint-disable-next-line no-unused-vars
  const tree = ReactTestRenderer.create(
    <HomeScreen navigator={mockNavigator} />
  );
});
