import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { MeshGradient } from '../../../lib/typescript';
import Slider from './Slider';

const { width, height } = Dimensions.get('screen');

const Item: React.FC<{
  item: string;
  setIsEditing: React.Dispatch<
    React.SetStateAction<{ isEditing: boolean; index: number }>
  >;
  index: number;
  isEditing: { isEditing: boolean; index: number };
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ item, index, setIsEditing, isEditing, data, setData }) => {
  const scale = useSharedValue(1);
  const offsetY = useSharedValue(0);
  const [blurRadius, setBlurRadius] = useState(0);
  const isInEditingMode = isEditing.isEditing && isEditing.index === index;
  const DURATION = 200;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: isInEditingMode
            ? withTiming((scale.value = 1.4))
            : withTiming((scale.value = 1)),
        },
        {
          translateY: isInEditingMode
            ? withTiming(
                (offsetY.value = -(
                  height / 2 -
                  300 -
                  StaticSafeAreaInsets.safeAreaInsetsTop
                )),
                {
                  duration: DURATION,
                  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                }
              )
            : withTiming((offsetY.value = 0), {
                duration: DURATION,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              }),
        },
      ],
    };
  }, [isEditing]);

  return (
    <>
      <Animated.View
        style={[
          { height, width, justifyContent: 'center', alignItems: 'center' },
          animatedStyles,
        ]}
      >
        <GestureDetector
          gesture={Gesture.Fling()
            .direction(Directions.DOWN)
            .onStart(() => {
              runOnJS(setIsEditing)({ isEditing: false, index: -1 });
            })}
        >
          <TouchableOpacity
            onPress={() => {
              if (!isInEditingMode) {
                setIsEditing({ isEditing: true, index });
              }
            }}
            activeOpacity={0.8}
          >
            <MeshGradient
              width={200}
              height={200}
              uniqueKey={item}
              blurRadius={blurRadius}
              style={{ borderRadius: 40, borderCurve: 'continuous' }}
            ></MeshGradient>
          </TouchableOpacity>
        </GestureDetector>
        {isInEditingMode && (
          <View
            style={{
              gap: 20,
              flexDirection: 'column',
              width,
              alignItems: 'center',
            }}
          >
            <TextInput
              style={{
                padding: 10,
                width: 200,
                marginTop: 20,
                fontWeight: 'bold',
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
              }}
              keyboardAppearance="dark"
              autoCapitalize="none"
              value={item}
              onChangeText={(text) => {
                const newData = [...data];
                newData[index] = text;
                setData(newData);
              }}
              placeholder="Enter a unique value"
              placeholderTextColor={'grey'}
            />
            <View style={{ gap: 6 }}>
              <Text style={{ color: 'white' }}>Blur radius - {blurRadius}</Text>
              <Slider
                onValueChange={(value) => setBlurRadius(value)}
                range={[0, 1]}
                step={0.1}
                startValue={blurRadius}
              />
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
};

export default Item;
