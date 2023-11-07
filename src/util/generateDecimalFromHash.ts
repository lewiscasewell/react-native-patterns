export function generateDecimalFromHash(
  hash: string,
  index1: number,
  index2: number,
  charModifier: string
) {
  // Combine the selected parts of the hash based on the indices and modifier character.
  const basePart = hash.substring(index1, index1 + 8); // Extract part of the hash based on index1.
  const modifierPart = hash.substring(index2, index2 + 8); // Extract part of the hash based on index2.

  // Convert extracted strings to large integers using BigInt for full precision.
  const baseNum = BigInt('0x' + basePart);
  const modifierNum = BigInt('0x' + modifierPart);

  // Use the ASCII value of the character as a part of the seed.
  const charCode = charModifier.charCodeAt(0);
  const combinedSeed =
    (baseNum * modifierNum * BigInt(charCode)) % BigInt('0xFFFFFFFFFFFFFFFF'); // Combine and mod to keep within range.

  // Generate a floating-point number based on the combined seed.
  // Convert the result to a fixed decimal place string, then to a float, to ensure consistent decimal places across different platforms and invocations.
  const maxDecimal = BigInt('100000000'); // 8 decimal places.
  const decimalValue = Number(combinedSeed % maxDecimal) / Number(maxDecimal);

  return Number(decimalValue.toFixed(8)); // Return the value with 8 decimal places.
}
