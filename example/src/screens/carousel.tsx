import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { MeshGradient, getRandomColor } from 'react-native-patterns';
import { v4 as uuid } from 'uuid';

const data = Array.from({ length: 12 }).map(() => {
  return {
    id: uuid(),
    colors: Array.from({ length: 8 }, () => getRandomColor()),
  };
});

const CarouselScreen = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <MeshGradient
            uniqueKey={item.id}
            colors={item.colors}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height}
          />
        );
      }}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
    />
  );
};

export default CarouselScreen;
