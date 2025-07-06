const fontFamily = {
  "display": "sans-serif",
  "serif": "sans-serif",
  "sans-serif": "serif",
  "monospace": "monospace"
}


export type FontFamily = typeof fontFamily
export default fontFamily
const exported = {
  ...fontFamily,
  default: fontFamily
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
