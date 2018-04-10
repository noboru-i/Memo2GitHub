/* global it */
import 'react-native';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import App from '../src/App';

it('renders correctly', () => {
  const tree = ReactTestRenderer.create(<App />); // eslint-disable-line no-unused-vars
});
