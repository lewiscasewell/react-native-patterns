import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

const UniqueKeyInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      keyboardAppearance="dark"
      style={styles.input}
      selectTextOnFocus
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'white',
    flex: 1,
    padding: 8,
  },
});

export default UniqueKeyInput;
