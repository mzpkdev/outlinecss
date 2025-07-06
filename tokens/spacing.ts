const spacing = {
  "2xs": "0.25rem",
  "xs": "0.5rem",
  "sm": "0.75rem",
  "md": "1rem",
  "lg": "1.25rem",
  "xl": "1.5rem",
  "2xl": "1.75rem"
}


export type Spacing = typeof spacing
export default spacing
const exported = {
  ...spacing,
  default: spacing
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
