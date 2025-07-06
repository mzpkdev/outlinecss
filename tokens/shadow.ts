const shadow = {
  "none": `"0 0 #0000"`,
  "inner": `"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"`,
  "level-1": `"0 1px 2px 0 rgb(0 0 0 / 0.05)"`,
  "level-2": `"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"`,
  "level-3": `"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"`
}


export type Shadow = typeof shadow
export default shadow
const exported = {
  ...shadow,
  default: shadow
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
