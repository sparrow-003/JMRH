import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type Device = { deviceId: string; loginAt: string; expiresAt: number }

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  // simple session guard (client-side)
  useEffect(() => {
    const sess = localStorage.getItem('admin_session')
    if (!sess) {
      navigate('/admin/login')
      return
    }
    const s = JSON.parse(sess)
    if (s.expiresAt && Date.now() > s.expiresAt) {
      localStorage.removeItem('admin_session')
      navigate('/admin/login')
    }
  }, [navigate])

  // Admin devices view (client-side mock)
  const adminSessions = JSON.parse(localStorage.getItem('admin_sessions') || '{}')
  const current = JSON.parse(localStorage.getItem('admin_session') || '{}')
  const adminId = current?.adminId || 'admin'
  const devices: Device[] = (adminSessions[adminId]?.devices) ? adminSessions[adminId].devices.map((d: any) => ({ deviceId: d.deviceId, loginAt: d.loginAt, expiresAt: d.expiresAt })) : []

  const logoutOtherDevices = () => {
    const raw = localStorage.getItem('admin_sessions') || '{}'
    const map = JSON.parse(raw)
    map[adminId] = { devices: [ { deviceId: current?.deviceId || '', loginAt: new Date().toISOString(), expiresAt: Date.now() + 15*24*60*60*1000 } ] }
    localStorage.setItem('admin_sessions', JSON.stringify(map))
    window.location.reload()
  }

  const logout = () => {
    localStorage.removeItem('admin_session')
    navigate('/admin/login')
  }

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4"><Link to="/admin/archives" className="text-blue-600">Archives</Link></div>
        <div className="card p-4"><span>Users</span></div>
        <div className="card p-4"><span>Settings</span></div>
      </div>
      <section className="card p-4 mb-6">
        <h3 className="font-semibold mb-2">Active Devices</h3>
        {devices.length === 0 ? (
          <div className="text-muted">No devices registered.</div>
        ) : (
          <ul>
            {devices.map((d, idx) => (
              <li key={idx} className="text-sm" style={{marginBottom: 6}}>
                Device {d.deviceId} — Login {new Date(d.loginAt).toLocaleString()} — Expires {new Date(d.expiresAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        <button className="btn mt-2" onClick={logoutOtherDevices}>Logout Other Devices</button>
        <button className="btn ml-2" onClick={logout}>Logout</button>
      </section>
    </motion.div>
  )
}

export default AdminDashboard
