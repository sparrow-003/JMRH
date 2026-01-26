import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSupabaseClient } from '../../utils/supabaseClient'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@example.com')
  const [password, setPassword] = useState<string>('password')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const sb = await getSupabaseClient()
    if (sb) {
      try {
        const res: any = await sb.auth.signIn({ email, password })
        if (res?.error) { setError(res.error.message); return }
        localStorage.setItem('admin_session', JSON.stringify({ admin: true, email }))
        navigate('/admin/dashboard')
      } catch (e: any) {
        setError(e?.message ?? 'Login failed')
      }
      return
    }
    // Dev fallback
    if (email === 'jmeh@123' && password === 'jmrh@123') {
      localStorage.setItem('admin_session', JSON.stringify({ admin: true, email }))
      navigate('/admin/dashboard')
    } else {
      setError('Invalid admin credentials (dev-only).')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <motion.div className="card p-6 w-full max-w-md" initial={{ scale: 0.98 }} animate={{ scale: 1 }}>
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default AdminLogin
