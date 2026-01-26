import React, { useState } from 'react'

type Doc = { id: string; title: string; description?: string; file_url?: string; uploaded_at?: string }

const UserSubmitPaper: React.FC = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [fileName, setFileName] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fileURL = URL.createObjectURL(new Blob(['dummy'], { type: 'text/plain' }))
    const doc: Doc = { id: Date.now().toString(), title: title || fileName || 'Untitled Paper', description: desc, file_url: fileURL, uploaded_at: new Date().toISOString() }
    const docs = JSON.parse(localStorage.getItem('docs') || '[]')
    const next = [doc, ...docs]
    localStorage.setItem('docs', JSON.stringify(next))
    setStatus('Paper submitted (demo).')
    setTitle('')
    setDesc('')
    setFileName('')
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Submit Paper</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea placeholder="Description" rows={3} value={desc} onChange={e=>setDesc(e.target.value)} />
          <input type="file" onChange={e=>setFileName(e.target.files?.[0]?.name || '')} />
          <button className="btn">Submit</button>
        </form>
        {status && <div className="text-muted mt-2">{status}</div>}
      </div>
    </div>
  )
}

export default UserSubmitPaper
