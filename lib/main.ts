import * as minimist from "minimist"
import build from "@/commands/build"
import { DEFAULT_ENTRY, DEFAULT_OUTPUT, DEFAULT_TOKENS } from "@/constants"


export async function main(...varargs: string[]): Promise<number> {
    const options = minimist(varargs, {
        alias: { o: "output", e: "entry", t: "tokens" },
        default: { output: DEFAULT_OUTPUT, entry: DEFAULT_ENTRY, tokens: DEFAULT_TOKENS }
    })
    const [ command ] = options._
    const entry = options.entry !== "null"
        ? options.entry : null
    const output = options.output !== "null"
        ? options.output : null
    const tokens = options.tokens !== "null"
        ? options.tokens : null
    switch (command) {
        default:
        case "build":
            return await build({ entry, output, tokens })
        case "serve":
            console.log("Not yet implemented.")
            return 0
    }
}


main(...process.argv.slice(2))
    .then(code => process.exit(code))
    .catch(error => {
        console.log(error)
        process.exit(-1)
    })