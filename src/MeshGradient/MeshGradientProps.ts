import { ViewProps } from 'react-native';

export interface MeshGradientProps extends ViewProps {
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
   * How much the pattern should be blurred
   * @default blurRadius = 20
   */
  blurRadius?: number;
  /**
   * The colors of the pattern. If no colors are provided, a random color will be generated.
   */
  colors?: string[];
  /**
   * The color of the overlay.
   * @default overlayColor = 'black'
   */
  overlayColor?: string;
  /**
   * The opacity of the overlay.
   * @default overlayOpacity = 0.5
   */
  overlayOpacity?: number;
}
