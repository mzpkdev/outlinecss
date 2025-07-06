import color from "./color"
import spacing from "./spacing"
import radius from "./roundness"


const design = {
  "roundness": radius["xs"],
  "color": {
    "primary": color["teal"],
    "text": color["slate"],
    "background": color["white"]
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
