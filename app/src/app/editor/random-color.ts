/** returns a color in string `hsla` format  */
export function randomColor() : string {
    return `hsla(${Math.floor(Math.random()*360)}, 100%, 50%, 1)`;
}