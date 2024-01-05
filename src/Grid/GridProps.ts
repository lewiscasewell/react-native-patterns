import { ViewProps } from 'react-native';

export interface GridProps extends ViewProps {
  width: number;
  height: number;
  uniqueKey: string;
  frontColor?: string;
  backColor?: string;
  shape?: 'square';
  borderSize?: number;
  zoomPercentage?: number;
  mask?: 'none' | 'radial-outer' | 'radial-inner';
}
