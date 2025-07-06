const fontSize = {
  "2xs": "0.5rem",
  "xs": "0.75rem",
  "sm": "0.875rem",
  "md": "1rem",
  "lg": "1.25rem",
  "xl": "1.75rem",
  "2xl": "2.5rem",
  "3xl": "3.5rem"
}


export type FontSize = typeof fontSize
export default fontSize
const exported = {
  ...fontSize,
  default: fontSize
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
