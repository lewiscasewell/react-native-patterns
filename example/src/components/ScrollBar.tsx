import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { height } = Dimensions.get('screen');

const ScrollItem = ({
  data,
  scrollOffset,
  item,
  index,
  handleScrollItemPress,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value / height,
        data.map((_, i) => i),
        data.map((_, i) => (index === i ? 120 : 30))
      ),
    };
  });

  return (
    <TouchableOpacity onPress={handleScrollItemPress} hitSlop={15}>
      <Animated.View
        key={item}
        style={[
          {
            width: 10,
            height: 100,
            borderRadius: 10,
            backgroundColor: 'white',
          },
          animatedStyles,
        ]}
      />
    </TouchableOpacity>
  );
};

const ScrollBar: React.FC<{
  scrollOffset: SharedValue<number>;
  data: string[];
  handleScrollItemPress: (index: number) => void;
}> = ({ scrollOffset, data, handleScrollItemPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        height,
        right: 0,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 16,
        zIndex: 2,
      }}
    >
      {data.map((item, index) => {
        return (
          <ScrollItem
            key={index}
            data={data}
            scrollOffset={scrollOffset}
            item={item}
            index={index}
            handleScrollItemPress={() => handleScrollItemPress(index)}
          />
        );
      })}
    </View>
  );
};

export default ScrollBar;
