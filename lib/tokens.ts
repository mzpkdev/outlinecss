import * as path from "path"
import * as fs from "fs"
import { directories } from "@/constants"
import type { Color } from "../tokens/color"
import type { Design } from "../tokens/design"
import type { FontFamily } from "../tokens/font-family"
import type { FontSize } from "../tokens/font-size"
import type { Roundness } from "../tokens/roundness"
import type { Shadow } from "../tokens/shadow"
import type { Spacing } from "../tokens/spacing"
import type { ZIndex } from "../tokens/z-index"


export type Tokens = {
    "color"?: Partial<Color>
    "design"?: Partial<Design>
    "font-family"?: Partial<FontFamily>
    "font-size"?: Partial<FontSize>
    "roundness"?: Partial<Roundness>
    "shadow"?: Partial<Shadow>
    "spacing"?: Partial<Spacing>
    "z-index"?: Partial<ZIndex>
}

export const load = (directory: string | null): Tokens => {
    const accumulator: Record<string, unknown> = {}
    if (directory && fs.existsSync(directory)) {
        for (const tokens of fs.readdirSync(directory, { encoding: "utf-8" })) {
            accumulator[path.basename(tokens, path.extname(tokens))] = require(path.join(directory, tokens))
        }
    }
    return accumulator as Tokens
}

export const create = (tokens?: Tokens): Tokens => {
    const defaults: [ string, Record<string, unknown> ][] = fs.readdirSync(directories.tokens)
        .filter(file => path.extname(file) === ".js")
        .map(file => [ path.basename(file, path.extname(file)), require(path.join(directories.tokens, file)) ])
    const merged = defaults
        .map(([ name, value ]) => [ name, { ...value, ...tokens?.[name as keyof Tokens] } ])
    return Object.fromEntries(merged) as Tokens
}

export const sassify = (data: Record<string, unknown>): string => {
    const variables = Object.entries(data)
        .map(([ name, token ]) => variable(name, value(token)))
    return variables.join("\n")
}

const variable = (name: string, token: unknown): string => {
    return `$${name}: ${token};`
}

const value = (token: unknown): number | string => {
    if (typeof token === "number") {
        return token
    }
    if (typeof token === "string") {
        if (token.length === 0) {
            return "\"\""
        }
        return `${token}`
    }
    if (token === null || token === undefined) {
        return "null"
    }
    if (Array.isArray(token)) {
        return `(${token.map(value).join(", ")})`
    }
    if (typeof token === "object") {
        const entries = Object.entries(token)
            .map(([ name, token ]) => `"${name}": ${value(token)}`)
        return `(${entries.join(", ")})`
    }
    throw new Error(`Unexpected token value: "${token}".`)
}
