/**
 * 
 * @param {string} rgb 
 */
export default function parseRgb(rgb) {
    let arr = rgb.match(/\d{1,3}/g);
    if (!arr) return {r:0, g: 0, b:0}

    return {r:parseInt(arr[0]),g:parseInt(arr[1]),b:parseInt(arr[2])};
}