function numericHash(input: string, length = 16) {
  const charArray = Array.from(
    input + 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
  );
  const initialHashArray = charArray.map(
    (char, idx) => ((char.charCodeAt(0) + idx) * 19) % 10
  );
  let numericHash = initialHashArray.join('');

  // "Fold" the numeric hash in half and combine to mix the numbers more thoroughly
  while (numericHash.length > length * 2) {
    let splitIndex = Math.ceil(numericHash.length / 2);
    let part1 = numericHash.substring(0, splitIndex);
    let part2 = numericHash.substring(splitIndex);
    numericHash = '';

    for (let i = 0; i < part1.length; i++) {
      // @ts-expect-error
      let digit1 = i < part1.length ? parseInt(part1[i], 10) : 0;
      // @ts-expect-error
      let digit2 = i < part2.length ? parseInt(part2[i], 10) : 0;
      numericHash += (digit1 + digit2) % 10; // Use modulo to ensure a number between 0-9
    }
  }

  // Trim the numericHash to the desired length or pad with '0' if it's too short
  numericHash = numericHash.substring(0, length);
  while (numericHash.length < length) {
    numericHash += '0'; // Append '0' to ensure the length
  }

  const hash = numericHash.substring(0, length);

  return hash;
}

export default numericHash;
