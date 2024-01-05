import { ViewProps } from 'react-native';

export interface GridProps extends ViewProps {
  /**
   * The unique key makes the pattern reproducible.
   */
  uniqueKey: string;
  /**
   * The height of the canvas.
   * @default height = 200
   */
  height: number;
  /**
   * The width of the canvas.
   * @default width = 200
   */
  width: number;
  /**
   * Color that will be used for the foreground of the grid.
   * @default frontColor = randomly generated based on hash
   */
  frontColor?: string;
  /**
   * Color that will be used for the background of the grid.
   * @default backColor = randomly generated based on hash
   */
  backColor?: string;
  /**
   * The shapes that will be used to fill the grid.
   * @default shape = 'square'
   */
  shape?: 'square';
  /**
   * The size of the border around each shape.
   * @default borderSize = 0.5
   */
  borderSize?: number;
  /**
   * The size the shapes will be scaled to.
   * @default zoomPercentage = 0
   */
  zoomPercentage?: number;
  /**
   * Mask overlay that will be applied to the grid.
   * @default mask = 'none'
   */
  mask?: 'none' | 'radial-outer' | 'radial-inner';
}
