export async function extractNumberFromString(str) {
  // Match the first occurrence of a number in the string
  const match = str.match(/\d+/);

  // If a match is found, return it as a number, otherwise return null
  return match ? parseInt(match[0], 10) : null;
}
