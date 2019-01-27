/** @format */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Textile from '@textile/react-native-sdk';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 8, textAlign: 'center' }}>
          Built with Textile
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
