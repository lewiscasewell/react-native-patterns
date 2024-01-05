const lcg = (seed: number) => () => {
  seed = (1103515245 * seed + 12345) % 2147483647;
  return seed / 2147483647;
};

const calculateSquareDimensions = (
  zoomPercentage: number,
  canvasHeight: number,
  canvasWidth: number
) => {
  const s = zoomPercentage / 100;
  const x = s * (0.2 - 0.05) + 0.05;

  const dimension = Math.min(canvasHeight, canvasWidth);

  return dimension * x;
};

const getOpacity = (rand: number) => {
  if (rand > 0.9) return 0.85;
  if (rand > 0.8) return 0.7;
  if (rand > 0.7) return 0.5;
  if (rand > 0.6) return 0.3;
  return 0;
};

export { lcg, calculateSquareDimensions, getOpacity };
