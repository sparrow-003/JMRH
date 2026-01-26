import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../utils/AuthContext'
import { supabase } from '../utils/supabaseClient'

const UserSubmitPaper: React.FC = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [authors, setAuthors] = useState('')
  const [keywords, setKeywords] = useState('')
  const [abstract, setAbstract] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirect_after_login', '/submit-paper')
      navigate('/user/login')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const titleToUse = title || file?.name || 'Untitled Paper'
      const uploaded_at = new Date().toISOString()

      let fileUrl = ''
      let filePath = ''

      // Upload file if provided
      if (file) {
        filePath = `papers/${user?.id}/${Date.now()}_${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('papers')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('papers')
          .getPublicUrl(filePath)

        fileUrl = urlData.publicUrl
      }

      // Insert paper record
      const { error: insertError } = await supabase
        .from('documents')
        .insert([{
          title: titleToUse,
          description: desc,
          abstract,
          authors,
          keywords,
          file_url: fileUrl,
          file_path: filePath,
          uploaded_by: user?.id,
          uploaded_at,
          is_public: false, // Initially private, admin can approve
          status: 'pending'
        }])

      if (insertError) throw insertError

      setSuccess(true)

      // Reset form
      setTitle('')
      setDesc('')
      setAbstract('')
      setAuthors('')
      setKeywords('')
      setFile(null)

      setTimeout(() => {
        navigate('/user/papers')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-serif font-bold text-[#2C2C2C] mb-4"
          >
            Paper Submitted Successfully!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-[#4B5563] mb-6"
          >
            Your research paper has been submitted for review. We'll notify you once it has been reviewed by our editorial team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Link
              to="/user/papers"
              className="px-6 py-3 bg-[#2C2C2C] text-white font-semibold rounded-xl hover:bg-[#C5A065] transition-all duration-300"
            >
              View My Papers
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] font-semibold rounded-xl hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
            >
              Go Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-[#4B5563] hover:text-[#2C2C2C] transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-5xl font-serif font-bold text-[#2C2C2C] mb-3">
            Submit Your Research
          </h1>
          <p className="text-lg text-[#4B5563]">
            Share your work with the global research community
          </p>
        </motion.div>

        {/* Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="crystal-card p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Paper Title */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Paper Title *
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C] text-lg font-serif"
                placeholder="Enter your research paper title"
              />
            </div>

            {/* Authors */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Authors *
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C]"
                placeholder="Dr. Jane Smith, Dr. John Doe"
              />
              <p className="text-xs text-[#4B5563] mt-1">Separate multiple authors with commas</p>
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Abstract *
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C] resize-none"
                placeholder="Provide a concise summary of your research (200-300 words)"
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Keywords *
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C]"
                placeholder="machine learning, data science, AI"
              />
              <p className="text-xs text-[#4B5563] mt-1">Separate keywords with commas (3-6 recommended)</p>
            </div>

            {/* Description/Notes */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Additional Notes
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white text-[#2C2C2C] resize-none"
                placeholder="Any additional information for the editorial team"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-[#2C2C2C] mb-2 uppercase tracking-wider">
                Upload Paper (PDF) *
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#C5A065] focus:border-[#C5A065] focus:outline-none transition-all duration-300 bg-white cursor-pointer"
                />
              </div>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-green-700 font-medium">{file.name}</span>
                </motion.div>
              )}
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-red-700"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-[#2C2C2C] to-[#334155] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting Paper...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Submit for Review
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Guidelines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 crystal-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
        >
          <h3 className="font-serif text-xl font-bold text-[#2C2C2C] mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Submission Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-[#4B5563]">
            <li className="flex items-start">
              <span className="text-[#C5A065] mr-2">•</span>
              Papers must be original and not under review elsewhere
            </li>
            <li className="flex items-start">
              <span className="text-[#C5A065] mr-2">•</span>
              All submissions undergo double-blind peer review
            </li>
            <li className="flex items-start">
              <span className="text-[#C5A065] mr-2">•</span>
              Expected review time: 2-3 weeks
            </li>
            <li className="flex items-start">
              <span className="text-[#C5A065] mr-2">•</span>
              Accepted formats: PDF, DOC, DOCX
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default UserSubmitPaper
