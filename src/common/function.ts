export function randomCode(numberOfDigit: number): number {
  const end = 10 ** numberOfDigit - 1,
    start = 10 ** (numberOfDigit - 1);
  return Math.floor(Math.random() * (end - start) + start);
}
