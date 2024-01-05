import 'react-native-get-random-values';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MeshGradientScreen from './screens/mesh-gradient/mesh-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import GridScreen from './screens/grid/grid';

const Drawer = createDrawerNavigator();

const theme: typeof DefaultTheme = {
  dark: true,
  colors: {
    notification: 'white',
    background: 'black',
    border: 'black',
    card: 'black',
    primary: 'white',
    text: 'white',
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: Platform.OS === 'android',
        }}
      >
        <Drawer.Screen name="Mesh gradient" component={MeshGradientScreen} />
        <Drawer.Screen name="Grid" component={GridScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
