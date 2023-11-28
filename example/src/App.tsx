import 'react-native-get-random-values';
import React from 'react';
import { StatusBar } from 'react-native';
import { defaultColors } from './Constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Scroll from './screens/scroll';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Scroll />
    </GestureHandlerRootView>
  );
};

export default App;
