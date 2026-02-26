import React, { useEffect, useState } from 'react'

type Doc = { id: string; title: string; description?: string; file_url?: string; uploaded_at?: string }

const AdminArchives: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('docs')
    if (stored) setDocs(JSON.parse(stored))
  }, [])

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    const blob = new Blob([`Demo content for ${title || fileName || 'Untitled'}`], { type: 'text/plain' })
    const doc: Doc = {
      id: Date.now().toString(),
      title: title || (fileName || 'Untitled'),
      description: desc,
      file_url: URL.createObjectURL(blob),
      uploaded_at: new Date().toISOString()
    }
    const next = [doc, ...docs]
    setDocs(next)
    localStorage.setItem('docs', JSON.stringify(next))
    setTitle('')
    setDesc('')
    setFileName('')
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setFileName(f?.name ?? '')
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Archives</h1>
      <form className="card p-4 mb-4" onSubmit={handleUpload}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <input className="border rounded px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
          <input className="border rounded px-3 py-2" type="file" onChange={onFileChange} />
        </div>
        <div className="mt-3"><button className="btn">Upload Paper</button></div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map(d => (
          <div key={d.id} className="card p-3 archive-item">
            <strong>{d.title}</strong>
            <div className="text-muted" style={{fontSize:'0.95em'}}>{d.description}</div>
            {d.file_url && <a href={d.file_url} download className="text-blue-600 mt-2 inline-block">Download</a>}
            <div className="text-muted" style={{fontSize:'0.8em'}}>Uploaded: {new Date(d.uploaded_at || Date.now()).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminArchives
// Updated for git commit
