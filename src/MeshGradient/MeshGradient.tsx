import React, { useMemo } from 'react';
import type { MeshGradientProps } from './MeshGradientProps';
import { BlurMask, Canvas, Group, Rect } from '@shopify/react-native-skia';
import { View } from 'react-native';
import numericHash from '../util/numericHash';
import Shape from './Shape';
import getRandomColor from '../util/getRandomColor';
import generateHexColors from '../util/generateColorFromHash';

const defaultColors = Array.from({ length: 4 }, () => getRandomColor());

function MeshGradientImpl({
  width,
  height,
  uniqueKey,
  blurRadius = 0,
  colors,
  children,
  overlayColor = 'black',
  overlayOpacity = 0,
  style,
}: MeshGradientProps): React.ReactElement {
  const hash = numericHash(uniqueKey, 32);
  const blur = Math.min(height, width) * blurRadius;
  let finalColors = defaultColors;

  if (!colors) {
    finalColors = generateHexColors(hash, 4);
  } else {
    finalColors = colors;
  }

  const paths = useMemo(() => {
    return finalColors.map((color, index) => {
      return (
        <Shape
          key={`${uniqueKey}-${color}-${index}`}
          hash={hash}
          color={color}
          index={index}
          canvasWidth={width}
          canvasHeight={height}
        />
      );
    });
  }, [colors, hash, height, width, uniqueKey]);

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
            color={finalColors[0]}
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
