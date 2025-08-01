// pages/_app.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import App from '../App';

AppRegistry.registerComponent(appName, () => App);
const { getApplication } = AppRegistry.getApplication(appName);

export default function MainApp() {
  const { element } = getApplication();
  return element;
}
