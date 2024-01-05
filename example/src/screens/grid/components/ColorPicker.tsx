import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { defaultColors } from '../../../Constants';

const { width } = Dimensions.get('screen');

type CurrentColor = string | undefined;

type Props = {
  title: string;
  currentColor: CurrentColor;
  setCurrentColor: React.Dispatch<React.SetStateAction<CurrentColor>>;
};

const ColorPicker: React.FC<Props> = ({
  currentColor,
  setCurrentColor,
  title,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {[undefined, ...defaultColors].map((color, index) => (
          <TouchableOpacity
            style={[
              styles.colorTouchable,
              {
                backgroundColor: color,
                opacity: color === currentColor ? 1 : 0.5,
              },
            ]}
            key={`${color}`}
            onPress={() => setCurrentColor(color)}
          >
            {color === undefined && (
              <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>
                ?
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 4,
  },
  colorTouchable: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorPicker;
