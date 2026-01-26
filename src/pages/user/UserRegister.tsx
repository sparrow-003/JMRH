import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserRegister: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // For demo: save to localStorage users array
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find((u: any) => u.email === email)) {
      setMsg('User already exists')
      return
    }
    users.push({ id: Date.now().toString(), email, password, name })
    localStorage.setItem('users', JSON.stringify(users))
    setMsg('Registered. You can now log in.')
    setTimeout(() => navigate('/user/login'), 800)
  }

  return (
    <div className="container mx-auto max-w-md">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn">Sign Up</button>
        </form>
        {msg && <div className="text-muted mt-2">{msg}</div>}
      </div>
    </div>
  )
}

export default UserRegister
