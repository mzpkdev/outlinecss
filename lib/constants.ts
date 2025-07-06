import * as path from "path"


const pkg = require("../package.json")

export const directories = {
    get root() {
        if (process.cwd().includes(pkg.name)) {
            return process.cwd()
        }
        return require.resolve(pkg.name).replace(path.join(pkg.main), "")
    },
    get styles() {
        return path.join(this.root, "./styles")
    },
    get tokens() {
        return path.join(this.root, "./tokens")
    },
    get themes() {
        return path.join(this.styles, "./themes")
    },
    get temp() {
        return path.join(this.root, "./temp")
    }
}

export const DEFAULT_ENTRY = `./styles/main.scss`
export const DEFAULT_OUTPUT = `./dist/style.css`
export const DEFAULT_TOKENS = `./tokens`
