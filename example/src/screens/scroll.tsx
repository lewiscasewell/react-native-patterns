import React from 'react';
import { Dimensions, View } from 'react-native';
import { MeshGradient } from 'react-native-patterns';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const ScrollItem = ({ data, scrollOffset, item, index }) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value / height,
        data.map((_, i) => i),
        data.map((_, i) => (index === i ? 120 : 20))
      ),
    };
  });

  return (
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
  );
};

const ScrollBar: React.FC<{
  scrollOffset: SharedValue<number>;
  data: string[];
}> = ({ scrollOffset, data }) => {
  return (
    <View
      style={{
        position: 'absolute',
        height,
        width,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
        gap: 14,
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
          />
        );
      })}
    </View>
  );
};

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

const Scroll = () => {
  const data = ['react', 'native', 'patterns', 'v1.0.5 🎉'];
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const aref = useAnimatedRef<Animated.FlatList<any>>();
  return (
    <View style={{ backgroundColor: 'black' }}>
      {data.map((item, index) => {
        return (
          <Background
            key={index}
            index={index}
            item={item}
            scrollOffset={scrollOffset}
            data={data}
          />
        );
      })}
      <ScrollBar scrollOffset={scrollOffset} data={data} />
      <Animated.FlatList
        bounces={false}
        ref={aref}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.9}
        snapToInterval={height}
        data={['react', 'native', 'patterns', 'v1.0.5 🎉']}
        renderItem={({ item }) => (
          <View
            style={{
              height,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MeshGradient
              width={200}
              height={200}
              uniqueKey={item}
              style={{ borderRadius: 40, borderCurve: 'continuous' }}
            ></MeshGradient>
          </View>
        )}
      />
    </View>
  );
};

export default Scroll;
