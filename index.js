/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './App'
import {name as appName} from './app.json';
console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => AppContainer);
