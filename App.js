import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'
// import { AppRegistry } from 'react-native';
// import { Provider as PaperProvider, DefaultTheme,Theme } 
// from 'react-native-paper';
// import { name as appName } from './app.json';

// YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/config/Navigation/index'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }
  componentDidMount() {
    LogBox.ignoreAllLogs()

  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/pink.jpg')])
    await Promise.all([...imageAssets])
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (

      <NavigationContainer>
        <StatusBar />
        <StackNavigator />
      </NavigationContainer>

    )
  }
}
// AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});