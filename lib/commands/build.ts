import * as fs from "fs"
import * as path from "path"
import * as sass from "sass"
import postcss from "postcss"
import { directories } from "@/constants"
import * as tokens from "@/tokens"


export type BuildOptions = {
    entry: string | null,
    output: string | null
    tokens: string | null
}

export default async function build(options: BuildOptions): Promise<number> {
    fs.mkdirSync(directories.temp, { recursive: true })
    fs.writeFileSync(
        path.join(directories.temp, "_globals.scss"),
        tokens.sassify(tokens.create(tokens.load(options.tokens)))
    )
    const base = fs.readFileSync(path.join(directories.styles, "./main.scss"), "utf8")
    const entry = options.entry ? fs.readFileSync(options.entry, "utf8") : ""
    const pathnames: string[] = [
        directories.styles,
        options.entry ? path.dirname(options.entry) : undefined
    ].filter((pathname): pathname is string => !!pathname)
    const compiled = await compile(base + entry, ...pathnames)
    if (options.output) {
        fs.mkdirSync(path.dirname(options.output), { recursive: true })
        fs.writeFileSync(options.output, compiled)
    }
    if (fs.existsSync(directories.temp)) {
        fs.rmSync(directories.temp, { recursive: true })
    }
    return 0
}

const compile = async (contents: string, ...pathnames: string[]): Promise<string> => {
    const preset = require("postcss-preset-env")
    const magician = require("postcss-font-magician")
    const cssnano = require("cssnano")
    const scss = sass.compileString(contents,
        { loadPaths: [ directories.temp, ...pathnames ] }
    )
    const phase1pcss = await postcss(preset)
        .process(scss.css.toString(), { from: undefined })
    const phase2pcss = await postcss(magician, cssnano)
        .process(phase1pcss.css.toString(), { from: undefined })
    return phase2pcss.css.toString()
}
