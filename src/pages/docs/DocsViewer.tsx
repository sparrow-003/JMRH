import React, { useEffect, useState } from 'react'
import { renderMarkdown } from '../../utils/markdown'

const DocsViewer: React.FC = () => {
  const [content, setContent] = useState('<p>Loading docs...</p>')

  useEffect(() => {
    fetch('/docs/index.md')
      .then(r => r.text())
      .then(md => setContent(renderMarkdown(md)))
      .catch(() => setContent('<p>Error loading docs.</p>'))
  }, [])

  return (
    <div className="container mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default DocsViewer
// Updated for git commit
