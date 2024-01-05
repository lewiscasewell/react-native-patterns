import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const ShuffleButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.touchable, props.style]}
    >
      <Text style={styles.text}>Shuffle</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '800',
    fontSize: 12,
  },
});

export default ShuffleButton;
