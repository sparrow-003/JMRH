import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../utils/supabaseClient'

interface Paper {
  id: string
  title: string
  authors?: string
  abstract?: string
  keywords?: string
  status: string
  uploaded_at: string
  uploaded_by?: string
  file_url?: string
}

interface User {
  id: string
  email: string
  name?: string
  created_at: string
}

interface Stats {
  totalPapers: number
  totalUsers: number
  pendingReviews: number
  publishedPapers: number
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'papers' | 'users' | 'settings'>('overview')
  const [papers, setPapers] = useState<Paper[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({ totalPapers: 0, totalUsers: 0, pendingReviews: 0, publishedPapers: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('admin_session')
    if (!adminSession) {
      navigate('/admin/login')
      return
    }

    loadData()

    // Set up real-time subscriptions
    const papersSubscription = supabase
      .channel('documents-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'documents'
      }, () => {
        loadPapers()
      })
      .subscribe()

    return () => {
      papersSubscription.unsubscribe()
    }
  }, [navigate])

  const loadData = async () => {
    setLoading(true)
    await Promise.all([loadPapers(), loadUsers()])
    setLoading(false)
  }

  const loadPapers = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false })

      if (error) throw error

      setPapers(data || [])

      // Calculate stats
      const total = data?.length || 0
      const pending = data?.filter(p => p.status === 'pending').length || 0
      const published = data?.filter(p => p.status === 'published').length || 0

      setStats(prev => ({
        ...prev,
        totalPapers: total,
        pendingReviews: pending,
        publishedPapers: published
      }))
    } catch (error) {
      console.error('Error loading papers:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

      if (authError) {
        console.error('Error loading users:', authError)
        return
      }

      const usersList = authData.users.map(user => ({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || 'Unknown',
        created_at: user.created_at
      }))

      setUsers(usersList)
      setStats(prev => ({ ...prev, totalUsers: usersList.length }))
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const updatePaperStatus = async (paperId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status: newStatus })
        .eq('id', paperId)

      if (error) throw error

      await loadPapers()
      setSelectedPaper(null)
    } catch (error) {
      console.error('Error updating paper:', error)
      alert('Failed to update paper status')
    }
  }

  const deletePaper = async (paperId: string) => {
    if (!window.confirm('Are you sure you want to delete this paper?')) return

    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', paperId)

      if (error) throw error

      await loadPapers()
      setSelectedPaper(null)
    } catch (error) {
      console.error('Error deleting paper:', error)
      alert('Failed to delete paper')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    sessionStorage.removeItem('admin_authenticated')
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">JMRH Control Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-4 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'papers', label: 'Papers', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-3 font-semibold text-sm transition-all duration-300 border-b-2 ${activeTab === tab.id
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-600 border-transparent hover:text-purple-600'
                  }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">System Overview</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Papers', value: stats.totalPapers, icon: '📄', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Pending Reviews', value: stats.pendingReviews, icon: '⏳', color: 'from-yellow-500 to-orange-500' },
                  { label: 'Published', value: stats.publishedPapers, icon: '✅', color: 'from-green-500 to-emerald-500' },
                  { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-purple-500 to-pink-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                      {stat.icon}
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Recent Submissions</h3>
                <div className="space-y-4">
                  {papers.slice(0, 5).map(paper => (
                    <div key={paper.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{paper.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{new Date(paper.uploaded_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${paper.status === 'published' ? 'bg-green-100 text-green-700' :
                          paper.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {paper.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Papers Tab */}
          {activeTab === 'papers' && (
            <motion.div
              key="papers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Manage Papers</h2>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Authors</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {papers.map(paper => (
                        <tr key={paper.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{paper.title}</div>
                            {paper.abstract && (
                              <div className="text-sm text-gray-600 mt-1 line-clamp-2">{paper.abstract}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{paper.authors || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{new Date(paper.uploaded_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <select
                              value={paper.status}
                              onChange={(e) => updatePaperStatus(paper.id, e.target.value)}
                              className="px-3 py-1 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-sm font-semibold"
                            >
                              <option value="pending">Pending</option>
                              <option value="under_review">Under Review</option>
                              <option value="published">Published</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {paper.file_url && (
                                <a
                                  href={paper.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="View Paper"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </a>
                              )}
                              <button
                                onClick={() => setSelectedPaper(paper)}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => deletePaper(paper.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">User Management</h2>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-semibold">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">System Settings</h2>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Information</h3>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                      <p className="text-sm text-gray-700"><strong>Role:</strong> Super Administrator</p>
                      <p className="text-sm text-gray-700 mt-2"><strong>Access Level:</strong> Full Control</p>
                      <p className="text-sm text-gray-700 mt-2"><strong>Session:</strong> Active</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Export All Data
                      </button>
                      <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Generate Report
                      </button>
                      <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Backup Database
                      </button>
                      <button className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        System Maintenance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Paper Detail Modal */}
      <AnimatePresence>
        {selectedPaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif font-bold text-gray-900">Paper Details</h3>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Title</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedPaper.title}</p>
                </div>

                {selectedPaper.authors && (
                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Authors</label>
                    <p className="mt-1 text-gray-900">{selectedPaper.authors}</p>
                  </div>
                )}

                {selectedPaper.abstract && (
                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Abstract</label>
                    <p className="mt-1 text-gray-700 leading-relaxed">{selectedPaper.abstract}</p>
                  </div>
                )}

                {selectedPaper.keywords && (
                  <div>
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Keywords</label>
                    <p className="mt-1 text-gray-900">{selectedPaper.keywords}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Status</label>
                  <select
                    value={selectedPaper.status}
                    onChange={(e) => updatePaperStatus(selectedPaper.id, e.target.value)}
                    className="mt-1 w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="under_review">Under Review</option>
                    <option value="published">Published</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  {selectedPaper.file_url && (
                    <a
                      href={selectedPaper.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all duration-300"
                    >
                      View Paper
                    </a>
                  )}
                  <button
                    onClick={() => deletePaper(selectedPaper.id)}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard
