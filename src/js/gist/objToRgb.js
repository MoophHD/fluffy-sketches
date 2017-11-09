/**
 * 
 * @param {{r: red, g: green, b: blue}} obj 
 */
export default function objToRgb(obj) {
    return `rgb(${obj.r}, ${obj.g}, ${obj.b})`;
}