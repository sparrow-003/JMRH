import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../utils/AuthContext'
import { supabase } from '../../utils/supabaseClient'

interface Paper {
  id: string
  title: string
  authors?: string
  abstract?: string
  keywords?: string
  description?: string
  status: string
  uploaded_at: string
  file_url?: string
}

const UserPapers: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/user/login')
      return
    }

    loadPapers()

    // Set up real-time subscription
    const subscription = supabase
      .channel('user-papers')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'documents',
        filter: `uploaded_by=eq.${user?.id}`
      }, (payload) => {
        console.log('Real-time update:', payload)
        loadPapers()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [isAuthenticated, user, navigate])

  const loadPapers = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('uploaded_by', user.id)
        .order('uploaded_at', { ascending: false })

      if (error) throw error

      setPapers(data || [])
    } catch (error) {
      console.error('Error loading papers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'from-green-500 to-emerald-500'
      case 'under_review':
        return 'from-blue-500 to-cyan-500'
      case 'rejected':
        return 'from-red-500 to-pink-500'
      default:
        return 'from-yellow-500 to-orange-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return '✅'
      case 'under_review':
        return '🔍'
      case 'rejected':
        return '❌'
      default:
        return '⏳'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#C5A065] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2C2C2C] text-lg font-semibold">Loading your papers...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0]">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2C2C2C] to-[#334155] rounded-lg flex items-center justify-center shadow-xl">
                  <span className="text-[#C5A065] font-serif text-2xl font-bold">J</span>
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#2C2C2C]">JMRH</h1>
                  <p className="text-xs text-[#4B5563] tracking-wider">My Papers</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right mr-4">
                <p className="text-sm font-semibold text-[#2C2C2C]">{user?.name || 'User'}</p>
                <p className="text-xs text-[#4B5563]">{user?.email}</p>
              </div>
              <Link
                to="/submit-paper"
                className="px-4 py-2 bg-gradient-to-r from-[#2C2C2C] to-[#334155] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Submit New Paper
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border-2 border-[#2C2C2C] text-[#2C2C2C] font-semibold rounded-lg hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-serif font-bold text-[#2C2C2C] mb-3">
            Your Submissions
          </h2>
          <p className="text-lg text-[#4B5563] mb-8">
            Track and manage your research papers
          </p>

          {papers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-3">
                No Papers Yet
              </h3>
              <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
                You haven't submitted any papers yet. Start sharing your research with the world!
              </p>
              <Link
                to="/submit-paper"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2C2C2C] to-[#334155] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Submit Your First Paper
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-2">
                          {paper.title}
                        </h3>
                        {paper.authors && (
                          <p className="text-sm text-[#4B5563] mb-2">
                            <span className="font-semibold">Authors:</span> {paper.authors}
                          </p>
                        )}
                        {paper.keywords && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {paper.keywords.split(',').map((keyword, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-[#C5A065]/10 text-[#C5A065] rounded-full text-xs font-semibold"
                              >
                                {keyword.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${getStatusColor(paper.status)} text-white rounded-xl shadow-lg`}>
                        <span className="text-xl">{getStatusIcon(paper.status)}</span>
                        <span className="font-bold text-sm uppercase tracking-wider">
                          {paper.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {paper.abstract && (
                      <div className="mb-4">
                        <p className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                          Abstract
                        </p>
                        <p className="text-[#4B5563] leading-relaxed line-clamp-3">
                          {paper.abstract}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-[#4B5563]">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Submitted: {new Date(paper.uploaded_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedPaper(paper)}
                          className="px-4 py-2 bg-[#2C2C2C] text-white font-semibold rounded-lg hover:bg-[#C5A065] transition-all duration-300"
                        >
                          View Details
                        </motion.button>
                        {paper.file_url && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={paper.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border-2 border-[#2C2C2C] text-[#2C2C2C] font-semibold rounded-lg hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
                          >
                            Download PDF
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
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
              className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-serif font-bold text-[#2C2C2C]">Paper Details</h3>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                    Title
                  </label>
                  <p className="text-xl font-serif text-[#2C2C2C]">{selectedPaper.title}</p>
                </div>

                {selectedPaper.authors && (
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                      Authors
                    </label>
                    <p className="text-[#4B5563]">{selectedPaper.authors}</p>
                  </div>
                )}

                {selectedPaper.abstract && (
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                      Abstract
                    </label>
                    <p className="text-[#4B5563] leading-relaxed">{selectedPaper.abstract}</p>
                  </div>
                )}

                {selectedPaper.keywords && (
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                      Keywords
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPaper.keywords.split(',').map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#C5A065]/10 text-[#C5A065] rounded-full text-sm font-semibold"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPaper.description && (
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                      Additional Notes
                    </label>
                    <p className="text-[#4B5563] leading-relaxed">{selectedPaper.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${getStatusColor(selectedPaper.status)} text-white rounded-xl shadow-lg`}>
                    <span className="text-xl">{getStatusIcon(selectedPaper.status)}</span>
                    <span className="font-bold uppercase tracking-wider">
                      {selectedPaper.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2C2C2C] uppercase tracking-wider mb-2">
                    Submission Date
                  </label>
                  <p className="text-[#4B5563]">
                    {new Date(selectedPaper.uploaded_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {selectedPaper.file_url && (
                  <div className="pt-6">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={selectedPaper.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#2C2C2C] to-[#334155] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Full Paper
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserPapers
// Updated for git commit
