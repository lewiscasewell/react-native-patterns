import { generateDecimalFromHash } from './generateDecimalFromHash';

export const createPoints = ({
  hash,
  height,
  index,
  width,
}: {
  thetaMult: number;
  width: number;
  height: number;
  index: number;
  hash: string;
}) => {
  const newPoints = [];
  const numPoints = 11;
  const angleStep = Math.PI * 2 * generateDecimalFromHash(hash, index, 0, 'a');
  const rad = Math.min(width, height) * 0.3;

  for (let i = 1; i <= numPoints; i++) {
    const theta = angleStep * i * generateDecimalFromHash(hash, index, i, 't');

    let x =
      rad * Math.cos(theta) +
      width / (generateDecimalFromHash(hash, index, i, 'x') * 10);
    let y =
      rad * Math.sin(theta) +
      height / (generateDecimalFromHash(hash, index, i, 'y') * 10);

    newPoints.push({
      x,
      y,
    });
  }

  return newPoints;
};
