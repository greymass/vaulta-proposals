const stripInline = (text: string): string =>
    text
        .replace(/`([^`]*)`/g, '$1')
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')

export interface CardFields {
    title: string
    excerpt: string
}

export function extractCardFields(body: string): CardFields {
    const lines = body.split('\n')
    const titleLine = lines.find((line) => line.startsWith('# '))
    const title = stripInline(titleLine?.slice(2).trim() ?? '')
    const start = lines.findIndex((line) => line.startsWith('## '))
    let excerpt = ''
    if (start !== -1) {
        let i = start + 1
        while (i < lines.length && lines[i].trim() === '') i++
        const paragraph: string[] = []
        while (i < lines.length && lines[i].trim() !== '') {
            paragraph.push(lines[i].trim())
            i++
        }
        excerpt = stripInline(paragraph.join(' '))
    }
    return { title, excerpt }
}

export function resolveExcerpt(authored: string | undefined, body: string): string {
    if (authored) return stripInline(authored)
    return extractCardFields(body).excerpt
}
