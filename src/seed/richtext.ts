/**
 * Tiny builder for Lexical rich text used by the seed. Supports headings,
 * paragraphs, bullet and numbered lists, tables and quotes, with **bold** and [label](/url) inline.
 */
type Node = { [k: string]: unknown; type: string; version: number }

const base = { format: '', indent: 0, version: 1, direction: 'ltr' as const }

const text = (t: string, bold = false): Node => ({ type: 'text', text: t, format: bold ? 1 : 0, style: '', mode: 'normal', detail: 0, version: 1 })

const inline = (src: string): Node[] => {
  const out: Node[] = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(text(src.slice(last, m.index)))
    if (m[1]) out.push(text(m[1], true))
    else
      out.push({
        ...base,
        type: 'link',
        version: 3,
        fields: { linkType: 'custom', url: m[3], newTab: false },
        children: [text(m[2])],
      })
    last = m.index + m[0].length
  }
  if (last < src.length) out.push(text(src.slice(last)))
  return out
}

export const p = (t: string): Node => ({ ...base, type: 'paragraph', textFormat: 0, children: inline(t) })
export const h2 = (t: string): Node => ({ ...base, type: 'heading', tag: 'h2', children: inline(t) })
export const h3 = (t: string): Node => ({ ...base, type: 'heading', tag: 'h3', children: inline(t) })
export const ul = (items: string[]): Node => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((t, i) => ({ ...base, type: 'listitem', value: i + 1, children: inline(t) })),
})

export const ol = (items: string[]): Node => ({
  ...base,
  type: 'list',
  listType: 'number',
  tag: 'ol',
  start: 1,
  children: items.map((t, i) => ({ ...base, type: 'listitem', value: i + 1, children: inline(t) })),
})
export const quote = (t: string): Node => ({ ...base, type: 'quote', children: inline(t) })

/** First row is the header row. */
export const table = (rows: string[][]): Node => ({
  ...base,
  type: 'table',
  children: rows.map((cells, r) => ({
    ...base,
    type: 'tablerow',
    children: cells.map((c) => ({
      ...base,
      type: 'tablecell',
      headerState: r === 0 ? 1 : 0,
      colSpan: 1,
      rowSpan: 1,
      backgroundColor: null,
      children: [p(c)],
    })),
  })),
})

export const rt = (...children: Node[]) => ({ root: { ...base, type: 'root', format: '' as const, children } })
