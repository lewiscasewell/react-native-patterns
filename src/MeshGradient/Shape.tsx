import { Path, useComputedValue, useValue } from '@shopify/react-native-skia';
import { createPoints } from '../util/createPoints';
import { spline } from '../util/spline';
import { useMemo } from 'react';

const Shape: React.FC<{
  hash: string;
  color: string;
  index: number;
  canvasWidth: number;
  canvasHeight: number;
}> = ({ hash, color, index, canvasWidth, canvasHeight }) => {
  const pointsSet = useMemo(
    () =>
      createPoints({
        thetaMult: 0.4,
        width: canvasWidth,
        height: canvasHeight,
        index,
        hash,
      }),
    [canvasHeight, canvasWidth, hash, index]
  );
  const pointsValue = useValue(pointsSet);

  const path = useComputedValue(() => {
    return spline(pointsValue.current, 1, true);
  }, [pointsValue]);

  return <Path key={`path_${index}`} path={path} color={color} />;
};

export default Shape;
