const zIndex = {
  "-50": -50,
  "-40": -40,
  "-30": -30,
  "-20": -20,
  "-10": -10,
  "0": 0,
  "10": 10,
  "20": 20,
  "30": 30,
  "40": 40,
  "50": 50,
}


export type ZIndex = typeof zIndex
export default zIndex
const exported = {
  ...zIndex,
  default: zIndex
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
