function convertBinary(binaryInput: string) {
  if (binaryInput === "") return NaN;
  if (!BINARY_REGEX.test(binaryInput)) return NaN;

  let decimalOutput = 0;

  // TODO: replace with incrementing
  for (
    let binaryIndex = binaryInput.length - 1;
    binaryIndex > -1;
    binaryIndex--
  ) {
    const binaryCharacter = binaryInput[binaryIndex];
    const binaryValue = 2 ** (binaryInput.length - binaryIndex - 1);

    decimalOutput += parseInt(binaryCharacter) * binaryValue;
  }

  return decimalOutput;
}

export default convertBinary;
