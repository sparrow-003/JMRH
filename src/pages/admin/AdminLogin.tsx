import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'

const getDeviceId = (): string => {
  const key = 'admin_device_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = 'adm-' + Math.random().toString(36).slice(2)
    localStorage.setItem(key, id)
  }
  return id
}

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@example.com')
  const [password, setPassword] = useState<string>('password')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // Dev-friendly fallback if Supabase not configured
    if (!supabase) {
      if (email === 'jmeh@123' && password === 'jmrh@123') {
        const adminId = 'admin'
        const deviceId = getDeviceId()
        const expiresAt = Date.now() + 15 * 24 * 60 * 60 * 1000
        const session = { adminId, deviceId, loginAt: new Date().toISOString(), expiresAt }
        localStorage.setItem('admin_session', JSON.stringify(session))
        // store per-admin devices in a simple map
        const raw = localStorage.getItem('admin_sessions') || '{}'
        const map = JSON.parse(raw)
        map[adminId] = map[adminId] || { devices: [] }
        const existing = map[adminId].devices.find((d: any) => d.deviceId === deviceId)
        if (!existing) map[adminId].devices.push({ deviceId, loginAt: new Date().toISOString(), expiresAt })
        localStorage.setItem('admin_sessions', JSON.stringify(map))
        navigate('/admin/dashboard')
        return
      } else {
        setError('Invalid credentials (dev-only).')
        return
      }
    }
    setLoading(true)
  const { data, error } = await (supabase!.auth.signInWithPassword({ email, password }) as any)
  const user = data?.user
  const session = data?.session
    setLoading(false)
    if (error) { setError(error.message); return }
    // Ensure admin role exists
    const adminId = user?.id ?? 'admin'
    const deviceId = getDeviceId()
    const expiresAt = Date.now() + 15 * 24 * 60 * 60 * 1000
    const s = { adminId, deviceId, loginAt: new Date().toISOString(), expiresAt }
    localStorage.setItem('admin_session', JSON.stringify(s))
    // record in admin_sessions map
    const raw = localStorage.getItem('admin_sessions') || '{}'
    const map = JSON.parse(raw)
    map[adminId] = map[adminId] || { devices: [] }
    const existing = map[adminId].devices.find((d: any) => d.deviceId === deviceId)
    if (!existing) map[adminId].devices.push({ deviceId, loginAt: new Date().toISOString(), expiresAt })
    localStorage.setItem('admin_sessions', JSON.stringify(map))
    navigate('/admin/dashboard')
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
