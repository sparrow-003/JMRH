export function renderMarkdown(md: string): string {
  // Very light markdown renderer: headings, bold, italic, links, and simple lists
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const lines = md.split(/\n/)
  let html = ''
  let inList = false
  for (let line of lines) {
    if (/^#\s+/.test(line)) {
      html += '<h1>' + esc(line.replace(/^#\s+/, '')) + '</h1>'
      inList = false
    } else if (/^##\s+/.test(line)) {
      html += '<h2>' + esc(line.replace(/^##\s+/, '')) + '</h2>'
      inList = false
    } else if (/^-\s+/.test(line)) {
      if (!inList) { html += '<ul>'; inList = true }
      html += '<li>' + line.replace(/^-\s+/, '') + '</li>'
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false }
      html += '<br/>'
    } else {
      // inline formatting: bold and links
      let t = esc(line)
      t = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      t = t.replace(/\*(.*?)\*/g, '<em>$1</em>')
      t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      html += '<p>' + t + '</p>'
      inList = false
    }
  }
  if (inList) html += '</ul>'
  return html
}
// Updated for git commit
