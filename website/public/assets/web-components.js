class HTMLPreview extends HTMLElement {
    constructor() {
        super()
        this.style.display = "flex"
        this.style.flexDirection = "column"
        this.style.gap = "var(--spacing__lg)"
        this.style.padding = "var(--spacing__2xl) 0"
        const preview = document.createElement("div")
        preview.innerHTML = `<div class="hstack gap:md">${this.innerHTML}</div>`
        const code = document.createElement("pre")
        code.style.fontFamily = "monospace"
        code.style.fontSize = "75%"
        code.style.whiteSpace = "pre"
        code.style.minWidth = "100%"
        code.style.maxWidth = "0"
        code.style.padding = "1em"
        code.style.background = "var(--color__text-100)"
        code.style.borderRadius = "var(--roundness)"
        code.style.overflowX = "auto"
        const style = document.createElement("style")
        style.textContent = `
          .token-tag        { color: #0077aa; }
          .token-attribute  { color: #aa00aa; }
          .token-value      { color: #228800; }
          .token-comment    { color: #999988; font-style: italic; }
        `

        const spaces = (string) => {
            const match = string.match(/^ +/);
            console.log({ match })
            return match?.[0].length ?? 0;
        }
        const reindent = (string) => {
            let lines = string.split("\n")
            if (lines[0].length === 0) {
                lines.shift()
            }
            const count = spaces(lines[0])
            return lines
                .map(line => line.slice(count, line.length))
                .join("\n")
        }
        const escape = (string) => reindent(string)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
        code.innerHTML = escape(this.innerHTML)
            .replace(/(&lt;!--[\s\S]*?--&gt;)/g,
                "<span class=\"token-comment\">$1</span>")
            .replace(/(&lt;\/?)([\w-]+)(.*?)(\/?&gt;)/g, (_, open, tag, rest, close) => {
                const attribute = rest.replace(/([\w-:]+)(=)("[^"]*")/g,
                    "<span class=\"token-attribute\">$1</span>$2<span class=\"token-value\">$3</span>")
                return `<span class="token-tag">${open}${tag}</span>${attribute}<span class="token-tag">${close}</span>`
            })
            .replace(/=<span class="token-value">""<\/span>/g, "")
        this.innerHTML = ``
        this.appendChild(style)
        this.appendChild(preview)
        this.appendChild(code)
    }
}

customElements.define("html-preview", HTMLPreview)
