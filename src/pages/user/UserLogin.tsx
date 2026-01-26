import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../utils/AuthContext'

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)

      // Redirect after login
      const redirectAfter = localStorage.getItem('redirect_after_login')
      if (redirectAfter) {
        localStorage.removeItem('redirect_after_login')
        navigate(redirectAfter)
      } else {
        navigate('/user/papers')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-3 mb-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#2C2C2C] to-[#334155] rounded-xl flex items-center justify-center shadow-xl">
              <span className="text-[#C5A065] font-serif text-3xl font-bold">J</span>
            </div>
            <div className="text-left">
              <h1 className="font-serif text-3xl font-bold text-[#2C2C2C]">JMRH</h1>
              <p className="text-xs text-[#4B5563] tracking-wider">Author Portal</p>
            </div>
          </motion.div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-2">Welcome Back</h2>
          <p className="text-[#4B5563]">Sign in to access your research dashboard</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="crystal-card p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C]"
                placeholder="your.email@university.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#C5A065] focus:ring-[#C5A065]"
                />
                <span className="text-sm text-[#4B5563]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#C5A065] hover:text-[#2C2C2C] font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#2C2C2C] to-[#334155] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke currentColor strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4B5563]">
              Don't have an account?{' '}
              <Link
                to="/user/register"
                className="text-[#C5A065] font-bold hover:text-[#2C2C2C] transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center justify-center text-sm text-[#4B5563] hover:text-[#2C2C2C] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default UserLogin
