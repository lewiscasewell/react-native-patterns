import {
  Canvas,
  Group,
  RadialGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { GridProps } from './GridProps';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import numericHash from '../util/numericHash';
import generateHexColors from '../util/generateColorFromHash';
import {
  lcg,
  calculateSquareDimensions,
  getOpacity,
} from './squareCalculations';

const ZOOM_PERCENTAGE = 10;
const BORDER_SIZE = 0.5;
const MASK = 'none';

function SquareGrid({
  width,
  height,
  uniqueKey,
  style,
  backColor,
  frontColor,
  zoomPercentage = ZOOM_PERCENTAGE,
  borderSize = BORDER_SIZE,
  mask = MASK,
  children,
}: GridProps) {
  const hash = numericHash(uniqueKey, 32);
  const colors = generateHexColors(hash, 2);
  const finalBackColor = backColor !== undefined ? backColor : colors[0];
  const finalFrontColor = frontColor !== undefined ? frontColor : colors[1];
  const squareSize = calculateSquareDimensions(zoomPercentage, height, width);

  const { rowCount, columnCount } = useMemo(
    () => ({
      rowCount: Math.ceil(width / squareSize),
      columnCount: Math.ceil(height / squareSize),
    }),
    [height, width, squareSize]
  );

  const radialColors = useMemo(() => {
    if (mask === 'radial-outer') {
      return [finalBackColor, finalBackColor, `${finalBackColor}BB`];
    }
    if (mask === 'radial-inner') {
      return [`${finalBackColor}00`, `${finalBackColor}AA`, finalBackColor];
    }
    return [];
  }, [mask, finalBackColor]);

  const Squares = React.memo(() => {
    const squares = [];
    const random = lcg(parseInt(hash));

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        const rand = random();
        const opacity = getOpacity(rand);

        squares.push(
          <Group key={`${i}-${j}`}>
            <Rect
              x={i * squareSize}
              y={j * squareSize}
              width={squareSize}
              height={squareSize}
              strokeWidth={borderSize}
              color={finalBackColor}
              opacity={1}
              style="fill"
            />
            <Rect
              x={i * squareSize}
              y={j * squareSize}
              width={squareSize}
              height={squareSize}
              strokeWidth={borderSize}
              color={finalFrontColor}
              opacity={opacity}
              style="fill"
            />
            <Rect
              x={i * squareSize}
              y={j * squareSize}
              width={squareSize}
              height={squareSize}
              strokeWidth={borderSize}
              color={finalFrontColor}
              style="stroke"
            />
          </Group>
        );
      }
    }
    return <>{squares}</>;
  });

  return (
    <View
      style={[
        {
          width,
          height,
        },
        styles.container,
        style,
      ]}
    >
      <Canvas
        style={{
          width: width,
          height: height,
          position: 'absolute',
        }}
      >
        <Group style="stroke" color={'white'} strokeWidth={1}>
          <Squares />
          {mask !== 'none' && (
            <Rect
              x={0}
              y={0}
              width={width}
              height={height}
              color={finalBackColor}
              style="fill"
            >
              <RadialGradient
                c={vec(width / 2, height / 2)}
                r={width / 2}
                colors={radialColors as string[]}
              />
            </Rect>
          )}
        </Group>
      </Canvas>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GridImpl: React.FC<GridProps> = (props) => {
  const shape = props.shape ? props.shape : 'square';
  if (shape === 'square') {
    return <SquareGrid {...props} />;
  } else {
    return <SquareGrid {...props} />;
  }
};

export const Grid = React.memo(GridImpl);
