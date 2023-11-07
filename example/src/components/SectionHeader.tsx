import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SectionHeader;
