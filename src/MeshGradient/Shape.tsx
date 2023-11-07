import { Path, useComputedValue, useValue } from '@shopify/react-native-skia';
import { createPoints } from '../util/createPoints';
import { spline } from '../util/spline';

const Shape: React.FC<{
  hash: string;
  color: string;
  index: number;
  canvasWidth: number;
  canvasHeight: number;
}> = ({ hash, color, index, canvasWidth, canvasHeight }) => {
  const pointsSet = createPoints({
    thetaMult: 0.4,
    width: canvasWidth,
    height: canvasHeight,
    index,
    hash,
  });
  const pointsValue = useValue(pointsSet);

  const path = useComputedValue(() => {
    return spline(pointsValue.current, 1, true);
  }, [pointsValue]);

  return <Path key={`path_${index}`} path={path} color={color} />;
};

export default Shape;
