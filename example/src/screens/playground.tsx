import { get } from 'http';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MeshGradient, getRandomColor } from 'react-native-patterns';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const GRAPHIC_CONTAINER_BORDER_RADIUS = 70;
const GRAPHIC_CONTAINER_BORDER_WIDTH = 10;

const PlaygroundScreen = () => {
  const [uniqueKey, setUniqueKey] = useState<string>('playground');
  const [colors, setColors] = useState<string[]>(
    Array.from({ length: 6 }).map(() => getRandomColor())
  );
  const [blurRadius, setBlurRadius] = useState('0.1');
  return (
    <MeshGradient
      width={Dimensions.get('screen').width}
      height={Dimensions.get('screen').height}
      uniqueKey={uniqueKey}
      style={styles.container}
      overlayOpacity={0.5}
      overlayColor="white"
      blurRadius={0.3}
    >
      <View style={styles.graphicContainer}>
        <MeshGradient
          style={styles.meshGradientContainer}
          uniqueKey={uniqueKey}
          width={200}
          height={200}
          colors={colors}
          blurRadius={Number(blurRadius)}
        />
      </View>
      <ScrollView
        style={{ flex: 1, width: Dimensions.get('window').width, padding: 20 }}
      >
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 10 }}
          >
            Unique key
          </Text>
          <TextInput
            value={uniqueKey}
            placeholder="Each key generates a unique pattern"
            onChangeText={setUniqueKey}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              fontSize: 18,
              width: 200,
            }}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 10 }}
          >
            Blur radius (between 0 - 1)
          </Text>
          <TextInput
            value={blurRadius}
            placeholder="Set the blur radius"
            onChangeText={setBlurRadius}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              fontSize: 18,
              width: 200,
            }}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          position: 'absolute',
          bottom: 20,
          right: 20,
          elevation: 10,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 10 },
        }}
        onPress={() => {
          setColors(Array.from({ length: 6 }).map(() => getRandomColor()));
        }}
      >
        <Text>Refresh colors</Text>
      </TouchableOpacity>
    </MeshGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + 10,
  },
  graphicContainer: {
    borderRadius: GRAPHIC_CONTAINER_BORDER_RADIUS,
    borderWidth: GRAPHIC_CONTAINER_BORDER_WIDTH,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 10,
  },
  meshGradientContainer: {
    borderRadius:
      GRAPHIC_CONTAINER_BORDER_RADIUS - GRAPHIC_CONTAINER_BORDER_WIDTH,
  },
});

export default PlaygroundScreen;
