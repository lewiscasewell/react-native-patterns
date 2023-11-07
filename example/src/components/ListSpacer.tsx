import React from 'react';
import { View } from 'react-native';

type Props = {
  orientation: 'horizontal' | 'vertical';
  size: number;
};

const ListSpacer: React.FC<Props> = ({ orientation, size }) => {
  return (
    <View
      style={orientation === 'horizontal' ? { width: size } : { height: size }}
    />
  );
};

export default ListSpacer;
