import React from 'react';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { MeshGradient } from 'react-native-patterns';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const Background: React.FC<{
  item: string;
  index: number;
  scrollOffset: SharedValue<number>;
  data: string[];
}> = ({ item, index, scrollOffset, data }) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value / height,
        data.map((_, i) => i),
        data.map((_, i) => (i === index ? 1 : 0))
      ),
    };
  });

  return (
    <Animated.View
      style={[
        { height, width, position: 'absolute', backgroundColor: 'black' },
        animatedStyles,
      ]}
    >
      <MeshGradient
        blurRadius={20}
        overlayOpacity={0.7}
        width={width}
        height={height}
        uniqueKey={item}
      />
    </Animated.View>
  );
};

export default Background;
