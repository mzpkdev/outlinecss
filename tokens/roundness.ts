const roundness = {
  "2xs": "0.125rem",
  "xs": "0.25rem",
  "sm": "0.375rem",
  "md": "0.5rem",
  "lg": "0.625rem",
  "xl": "0.750rem",
  "2xl": "0.875rem",
  "full": "9999px"
} as const


export type Roundness = typeof roundness
export default roundness
const exported = {
  ...roundness,
  default: roundness
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
