import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Width of the slider
const KnobSize = 15; // Size of the knob

const Slider: React.FC<{
  startValue: number;
  onValueChange?: (value: number) => void;
  range: [number, number];
  step: number;
  SliderWidth?: number;
}> = ({ onValueChange, range, step, startValue, SliderWidth = 200 }) => {
  const translateX = useSharedValue(startValue);
  const maxValue = SliderWidth - KnobSize;
  const totalSteps = (range[1] - range[0]) / step;
  const stepLength = maxValue / totalSteps;

  const updateKnobPosition = (x: number, fromPress: boolean) => {
    let newX = x;
    if (fromPress) {
      newX -= KnobSize / 2;
    }
    newX = Math.max(0, newX);
    newX = Math.min(maxValue, newX);

    const steppedValue = Math.round(newX / stepLength) * stepLength;
    translateX.value = withSpring(steppedValue, {
      damping: 20,
      stiffness: 150,
      mass: 0.5,
    });

    if (onValueChange) {
      const value =
        range[0] + (steppedValue / maxValue) * (range[1] - range[0]);
      runOnJS(onValueChange)(value);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      let newX = context.startX + event.translationX;
      runOnJS(updateKnobPosition)(newX, false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onTrackPress = (event) => {
    const { locationX } = event.nativeEvent;
    runOnJS(updateKnobPosition)(locationX, true);
  };

  return (
    <View style={[styles.container, { width: SliderWidth }]}>
      <TouchableOpacity
        style={[styles.touchableArea, { width: SliderWidth }]}
        onPressIn={onTrackPress}
        activeOpacity={0.8}
      >
        <View style={styles.sliderTrack} />
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler} hitSlop={40}>
        <Animated.View style={[styles.knob, animatedStyle]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: KnobSize,
    justifyContent: 'center',
  },
  touchableArea: {
    position: 'absolute',
    height: KnobSize,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: '100%',
  },
  knob: {
    width: KnobSize,
    height: KnobSize,
    borderRadius: KnobSize / 2,
    backgroundColor: '#ddd',
    position: 'absolute',
  },
});

export default Slider;
