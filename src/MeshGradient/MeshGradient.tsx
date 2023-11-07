import React, { useMemo } from 'react';
import type { MeshGradientProps } from './MeshGradientProps';
import { BlurMask, Canvas, Group, Rect } from '@shopify/react-native-skia';
import { View } from 'react-native';
import numericHash from '../util/numericHash';
import Shape from './Shape';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;
const defaultColors = Array.from({ length: 4 }, () => getRandomColor());

function MeshGradientImpl({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  uniqueKey,
  blurRadius = 0,
  colors = defaultColors,
  children,
  overlayColor = 'black',
  overlayOpacity = 0,
  style,
}: MeshGradientProps): React.ReactElement {
  const hash = numericHash(uniqueKey, 32);
  const blur = Math.min(height, width) * blurRadius;

  const paths = useMemo(() => {
    return colors.map((color, index) => {
      return (
        <Shape
          key={`shape_${index}`}
          hash={hash}
          color={color}
          index={index}
          canvasWidth={width}
          canvasHeight={height}
        />
      );
    });
  }, [colors, hash, height, width]);

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Canvas
        style={{
          width: width * 1.3,
          height: height * 1.3,
          position: 'absolute',
        }}
      >
        <Group>
          <BlurMask blur={blur} respectCTM={false} />
          <Rect
            x={0}
            y={0}
            width={width * 1.3}
            height={height * 1.3}
            color={colors[0]}
          />
          {paths}
        </Group>
        <Rect
          x={0}
          y={0}
          width={width * 1.3}
          height={height * 1.3}
          color={overlayColor}
          opacity={overlayOpacity}
        />
      </Canvas>
      {children}
    </View>
  );
}

export const MeshGradient = React.memo(MeshGradientImpl);
