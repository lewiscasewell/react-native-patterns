import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Slider from '../../../components/Slider';

const width = Dimensions.get('screen').width;

type Props = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomPercent = ({ zoom }: { zoom: number }) => (
  <Text style={{ color: 'grey' }}>({zoom}%)</Text>
);

const ZoomSlider = ({ zoom, setZoom }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Zoom <ZoomPercent zoom={zoom} />
      </Text>

      <Slider
        SliderWidth={width - 20}
        startValue={zoom}
        onValueChange={setZoom}
        range={[0, 100]}
        step={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default ZoomSlider;
