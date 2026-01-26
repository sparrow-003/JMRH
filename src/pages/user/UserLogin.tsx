import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Simple user login with Remember Me (lifetime login)
const UserLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  // Attempt to login against a mock users store in localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (user) {
      const expiresAt = remember ? Date.now() + 365 * 24 * 60 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000
      localStorage.setItem('user_session', JSON.stringify({ user, expires_at: expiresAt }))
      navigate('/user/papers')
    } else {
      setError('Invalid credentials')
    }
  }

  // Basic form
  return (
    <div className="container mx-auto max-w-md">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">User Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <label style={{display:'flex', alignItems:'center', gap:6}}>
            <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me
          </label>
          <button className="btn">Log In</button>
        </form>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </div>
    </div>
  )
}

export default UserLogin
