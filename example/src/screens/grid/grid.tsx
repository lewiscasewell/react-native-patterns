import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Easing,
  StyleSheet,
} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { Grid } from 'react-native-patterns';
import { defaultColors } from '../../Constants';
import ColorPicker from './components/ColorPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZoomSlider from './components/ZoomSlider';
import Animated, {
  WithTimingConfig,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ShuffleButton from './components/ShuffleButton';
import UniqueKeyInput from './components/UniqueKeyInput';
const { width, height } = Dimensions.get('screen');

const GridScreen = () => {
  const [zoom, setZoom] = useState(0);
  const [uniqueKey, setUniqueKey] = useState('grid');
  const [frontColor, setFrontColor] = useState<string | undefined>(
    defaultColors[3]
  );
  const [backColor, setBackColor] = useState<string | undefined>(
    defaultColors[1]
  );
  const isTyping = useSharedValue(false);
  const shuffleKey = () => setUniqueKey(Math.random().toString());

  const animatedPositionStyle = useAnimatedStyle(() => {
    return {
      zIndex: 10,
      transform: [
        {
          translateY: isTyping.value ? withSpring(150) : withSpring(0),
        },
      ],
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => {
    const options: WithTimingConfig = {
      duration: 300,
    };
    return {
      opacity: isTyping.value
        ? withTiming(0.8, options)
        : withTiming(0, options),
      zIndex: isTyping.value ? withTiming(5) : withTiming(-1),
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Animated.View style={[animatedOverlayStyle, styles.overlay]} />
          <Animated.View style={animatedPositionStyle}>
            <Grid
              height={300}
              width={300}
              uniqueKey={uniqueKey}
              style={styles.grid}
              zoomPercentage={zoom}
              frontColor={frontColor}
              backColor={backColor}
              mask="none"
            />
          </Animated.View>
          <View style={styles.spacer} />
          <ZoomSlider zoom={zoom} setZoom={setZoom} />
          <ColorPicker
            title="Front color"
            currentColor={frontColor}
            setCurrentColor={setFrontColor}
          />
          <ColorPicker
            title="Back color"
            currentColor={backColor}
            setCurrentColor={setBackColor}
          />
        </ScrollView>

        <View style={styles.outerInputContainer}>
          <View style={styles.inputContainer}>
            <UniqueKeyInput
              onChangeText={setUniqueKey}
              value={uniqueKey}
              onFocus={() => {
                setTimeout(() => {
                  isTyping.value = true;
                }, 200);
              }}
              onBlur={() => {
                isTyping.value = false;
              }}
            />
            <ShuffleButton onPress={shuffleKey} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop,
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    height,
    width,
    zIndex: 5,
    backgroundColor: 'black',
    position: 'absolute',
  },
  grid: {
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white',
  },
  spacer: {
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    backgroundColor: '#1d1d1d',
    borderRadius: 18,
  },
  outerInputContainer: {
    padding: 4,
    width,
  },
});

export default GridScreen;
