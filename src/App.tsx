import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin'
import './styles/index.css'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminArchives from './pages/admin/AdminArchives'
import UserRegister from './pages/user/UserRegister'
import UserLogin from './pages/user/UserLogin'
import UserSubmitPaper from './pages/user/UserSubmitPaper'
import UserPapers from './pages/user/UserPapers'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow">
          <div className="container flex justify-between items-center h-16">
            <div className="text-xl font-semibold">JMRH Admin Portal</div>
            <nav className="space-x-4 text-sm">
              <Link className="text-blue-600" to="/admin/login">Admin</Link>
              <Link className="text-blue-600" to="/user/register">User</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/archives" element={<AdminArchives />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/submit-paper" element={<UserSubmitPaper />} />
            <Route path="/user/papers" element={<UserPapers />} />
            <Route path="*" element={<Navigate to="/admin/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
