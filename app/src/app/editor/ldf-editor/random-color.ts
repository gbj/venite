/** returns a color in string `hsla` format  */
export function randomColor(): string {
  return `hsla(${Math.floor(
    ((Math.random() + 0.618033988749895) % 1) * 360
  )}, 35%, 70%, 1)`;
}
