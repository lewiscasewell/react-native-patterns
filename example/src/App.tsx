import 'react-native-get-random-values';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { MeshGradient } from 'react-native-patterns';
import { defaultColors } from './Constants';
import List from './components/List';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 200;

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={defaultColors[0]} />
      <MeshGradient
        uniqueKey="react-native-patterns"
        width={width}
        height={HEADER_HEIGHT}
        blurRadius={0.4}
        colors={defaultColors}
        overlayOpacity={0.6}
      >
        <Text style={styles.headerTitle}>react-native-patterns</Text>
      </MeshGradient>

      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionListContainer: {
    paddingBottom: 100,
  },
});

export default App;
