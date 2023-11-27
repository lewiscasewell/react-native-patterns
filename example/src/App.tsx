import 'react-native-get-random-values';
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   BottomTabNavigationOptions,
//   createBottomTabNavigator,
// } from '@react-navigation/bottom-tabs';
// import ListScreen from './screens/list';
import { Dimensions, StatusBar } from 'react-native';
import { defaultColors } from './Constants';
// import { MeshGradient } from 'react-native-patterns';
// import CarouselScreen from './screens/carousel';
// import PlaygroundScreen from './screens/playground';
import Scroll from './screens/scroll';

// const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
// const screenOptions: BottomTabNavigationOptions = {
//   headerShown: false,
//   tabBarBackground: () => (
//     <MeshGradient
//       height={100}
//       width={width}
//       overlayOpacity={0.7}
//       blurRadius={0.3}
//       uniqueKey="tab-bar"
//     />
//   ),
//   tabBarLabelStyle: {
//     color: 'white',
//   },
// };

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={defaultColors[0]} barStyle="light-content" />
      <Scroll />
    </>
  );
};

export default App;
