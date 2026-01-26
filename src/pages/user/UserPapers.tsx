import React from 'react'

type Doc = { id: string; title: string; description?: string; file_url?: string; uploaded_at?: string }

const UserPapers: React.FC = () => {
  const docs: Doc[] = JSON.parse(localStorage.getItem('docs') || '[]')
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Submissions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map(d => (
          <div key={d.id} className="card p-3">
            <strong>{d.title}</strong>
            <div className="text-muted" style={{fontSize:'0.9em'}}>{d.description}</div>
            {d.file_url && (
              <a href={d.file_url} download className="text-blue-600">Download</a>
            )}
            <div className="text-muted" style={{fontSize:'0.8em'}}>
              Uploaded: {new Date(d.uploaded_at || Date.now()).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPapers
