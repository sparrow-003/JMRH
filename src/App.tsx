import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import Home from './pages/Home'
import UserRegister from './pages/user/UserRegister'
import UserLogin from './pages/user/UserLogin'
import UserSubmitPaper from './pages/user/UserSubmitPaper'
import UserPapers from './pages/user/UserPapers'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminArchives from './pages/admin/AdminArchives'
import DocsViewer from './pages/docs/DocsViewer'
import './styles/index.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />

          {/* User Routes */}
          <Route path="/submit-paper" element={<UserSubmitPaper />} />
          <Route path="/user/submit-paper" element={<Navigate to="/submit-paper" replace />} />
          <Route path="/user/papers" element={<UserPapers />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/archives" element={<AdminArchives />} />

          {/* Documentation */}
          <Route path="/docs" element={<DocsViewer />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
