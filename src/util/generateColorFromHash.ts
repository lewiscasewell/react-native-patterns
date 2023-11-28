class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    // Simple pseudo-random number generator
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

function generateHexColors(hash: string, numColors: number): string[] {
  const colors: string[] = [];
  const seed = parseInt(hash.substring(0, 10), 10); // Using a part of the hash as a seed
  const rng = new SeededRandom(seed);

  for (let i = 0; i < numColors; i++) {
    const color = `#${Math.floor(rng.next() * 16777215)
      .toString(16)
      .padEnd(6, '0')}`;
    colors.push(color);
  }

  return colors;
}

export default generateHexColors;
