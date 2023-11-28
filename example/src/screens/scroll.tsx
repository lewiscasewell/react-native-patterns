import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ScrollBar from '../components/ScrollBar';
import Background from '../components/Background';
import Item from '../components/Item';

const { height } = Dimensions.get('screen');

const Scroll = () => {
  const [data, setData] = useState([
    'react',
    'native',
    'patterns',
    'v1.0.5 🎉',
  ]);
  const scrollOffset = useSharedValue(0);
  const [isEditing, setIsEditing] = useState({ index: -1, isEditing: false });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const aref = useAnimatedRef<Animated.FlatList<any>>();

  const handleScrollItemPress = (index: number) => {
    aref.current?.scrollToIndex({ index, animated: true });
  };

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

      {!isEditing.isEditing && (
        <ScrollBar
          scrollOffset={scrollOffset}
          data={data}
          handleScrollItemPress={handleScrollItemPress}
        />
      )}
      <Animated.FlatList
        // @ts-ignore
        ref={aref}
        bounces={false}
        scrollEnabled={!isEditing.isEditing}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.9}
        snapToInterval={height}
        data={data}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            setIsEditing={setIsEditing}
            index={index}
            isEditing={isEditing}
            data={data}
            setData={setData}
          />
        )}
      />
    </View>
  );
};

export default Scroll;
