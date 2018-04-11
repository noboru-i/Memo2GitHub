/* global document */
import { AppRegistry } from 'react-native';
import App from './src/App';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});
