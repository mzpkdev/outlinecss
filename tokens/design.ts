import color from "./color"
import spacing from "./spacing"
import radius from "./roundness"
import shadow from "./shadow"


const design = {
  "roundness": radius["xs"],
  "thickness": "1px",
  "shadow": shadow["level-1"],
  "color": {
    "primary": color["cyan"],
    "negative": color["red"],
    "text": color["zinc"],
    "background": color["zinc"]["50"]
  },
  "spacing": {
    "narrow": spacing["sm"],
    "regular": spacing["md"],
    "wide": spacing["lg"],
  },
  "transition": {
    "easing": "var(--easing__out-expo)",
    "duration": "175ms",
  }
}


export type Design = typeof design
export default design
const exported = {
  ...design,
  default: design
}
Object.defineProperty(exported, 'default', {
  enumerable: false
})
module.exports = exported
