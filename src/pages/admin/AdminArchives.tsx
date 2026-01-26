import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { supabase } from '../../utils/supabaseClient'

type Doc = { id: string; title: string; description?: string; file_url?: string; uploaded_at?: string; file_path?: string; uploaded_by?: string }

const AdminArchives: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchDocs = async () => {
      if (!supabase) {
        const stored = localStorage.getItem('docs')
        if (stored) setDocs(JSON.parse(stored))
        return
      }
      const { data, error } = await supabase.from('documents').select('*').order('uploaded_at', { ascending: false })
      if (!error && data) setDocs(data as Doc[])
    }
    fetchDocs()
  }, [])

  useEffect(() => {
    if (docs.length) gsap.from('.archive-item', { y: 20, opacity: 0, stagger: 0.08, duration: 0.4 })
  }, [docs])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const fileToUpload = file
    const titleToUse = title || (fileToUpload?.name ?? 'Untitled')
    const note = desc
    if (!supabase) {
      const fakeUrl = URL.createObjectURL(new Blob(['dummy content'], { type: 'text/plain' }))
      const newDoc: Doc = { id: Date.now().toString(), title: titleToUse, description: note, file_url: fakeUrl, uploaded_at: new Date().toISOString() }
      const next = [newDoc, ...docs]
      setDocs(next)
      localStorage.setItem('docs', JSON.stringify(next))
      setTitle('')
      setDesc('')
      setFile(null)
      return
    }
    // Supabase path: upload file and insert record
    if (!supabase) {
      setFile(null)
      return
    }
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    const path = `papers/${Date.now()}_${fileToUpload?.name ?? 'doc'}`
    const { error: upErr } = await supabase.storage.from('papers').upload(path, fileToUpload ?? new Blob())
    if (upErr) { console.error(upErr); return }
    const { data: urlData } = await supabase.storage.from('papers').getPublicUrl(path)
    const fileUrl = (urlData as any)?.publicURL ?? ''
    const uploaded_at = new Date().toISOString()
    const { data: inserted, error: insErr } = await (supabase!.from('documents').insert([{ title: titleToUse, description: note, file_url: fileUrl, file_path: path, uploaded_by: userId, uploaded_at, is_public: true }])) as any
    if (insErr) { console.error(insErr); return }
    const { data: fresh } = await supabase.from('documents').select('*').order('uploaded_at', { ascending: false }) as any
    setDocs(fresh as Doc[])
    setTitle('')
    setDesc('')
    setFile(null)
  }

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Archives</h1>
      <form className="card p-4 mb-4" onSubmit={handleUpload}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <input className="border rounded px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
          <input className="border rounded px-3 py-2" type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        </div>
        <div className="mt-3"><button className="btn">Upload Paper</button></div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map(d => (
          <motion.div key={d.id} className="archive-item card p-3" whileHover={{ scale: 1.02 }}>
            <strong>{d.title}</strong>
            <div className="text-muted" style={{fontSize: '0.95em'}}>{d.description}</div>
            {d.file_url && <a href={d.file_url} download className="text-blue-600 mt-2 inline-block">Download</a>}
            <div className="text-muted" style={{fontSize:'0.8em'}}>Uploaded: {new Date(d.uploaded_at || Date.now()).toLocaleString()}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default AdminArchives
