/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  BottomNavigation,
  Provider as PaperProvider,
  Text,
  Portal,
} from 'react-native-paper';
import MapScreen from './components/MapScreen';
import ListScreen from './components/ListScreen';
import SettingsScreen from './components/SettingsScreen';
import TimelineScreen from './components/TimelineScreen';

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'map', title: 'Map', icon: 'map'},
      {key: 'list', title: 'List', icon: 'format-list-bulleted'},
      {key: 'timeline', title: 'Timeline', icon: 'timeline'},
      {key: 'settings', title: 'Settings', icon: 'settings'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    map: MapScreen,
    list: ListScreen,
    settings: SettingsScreen,
    timeline: TimelineScreen,
  });

  render() {
    return (
      <PaperProvider>
        <Portal>
          <BottomNavigation
            navigationState={this.state}
            onIndexChange={this._handleIndexChange}
            renderScene={this._renderScene}
          />
        </Portal>
      </PaperProvider>
    );
  }
}
