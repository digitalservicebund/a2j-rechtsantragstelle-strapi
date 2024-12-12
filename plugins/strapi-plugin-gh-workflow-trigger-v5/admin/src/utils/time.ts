export function timeDifferenceString(from: Date, to: Date) {
  const difference = to.getTime() - from.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes % 60} m, ${seconds % 60} s`;
}
