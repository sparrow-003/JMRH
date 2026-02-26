import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2C2C2C] to-[#334155] rounded-lg flex items-center justify-center shadow-xl">
                <span className="text-[#C5A065] font-serif text-2xl font-bold">J</span>
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#2C2C2C] tracking-tight">
                  JMRH
                </h1>
                <p className="text-xs text-[#334155] font-medium tracking-wider">
                  International Research Journal
                </p>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Archives', 'Editorial Board', 'Guidelines'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="nav-link text-[#334155] hover:text-[#2C2C2C] font-medium text-sm tracking-wide transition-all duration-300"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/submit-paper"
                className="btn-scholar inline-flex items-center px-6 py-3 bg-[#2C2C2C] text-white font-semibold text-sm tracking-wider rounded-lg hover:bg-[#C5A065] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Submit Paper
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5f3f0] opacity-50"></div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-6"
              >
                <span className="micro-label px-4 py-2 bg-[#C5A065]/10 text-[#C5A065] rounded-full text-xs font-bold tracking-widest">
                  PEER-REVIEWED EXCELLENCE
                </span>
              </motion.div>

              <h1 className="font-serif text-6xl md:text-7xl font-bold text-[#2C2C2C] leading-tight mb-6">
                Advancing Global
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C5A065] to-[#2C2C2C]">
                  Research
                </span>
              </h1>

              <p className="text-lg text-[#4B5563] leading-relaxed mb-8 max-w-xl">
                The Journal of Modern Research in Humanities publishes groundbreaking research
                across disciplines, connecting scholars worldwide in the pursuit of knowledge
                and intellectual excellence.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/submit-paper"
                    className="inline-flex items-center px-8 py-4 bg-[#2C2C2C] text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Submit Your Research
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="#archives"
                    className="inline-flex items-center px-8 py-4 border-2 border-[#2C2C2C] text-[#2C2C2C] font-semibold rounded-xl hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
                  >
                    Browse Archives
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A065]/20 to-transparent rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {[
                      { label: 'Impact Factor', value: '4.8', trend: '+12%' },
                      { label: 'Citations', value: '8,200+', trend: '+28%' },
                      { label: 'Published Papers', value: '450+', trend: '+15%' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FAF9F6] to-white rounded-xl border border-gray-100"
                      >
                        <div>
                          <p className="text-sm text-[#4B5563] font-medium">{stat.label}</p>
                          <p className="text-3xl font-bold text-[#2C2C2C] font-serif">{stat.value}</p>
                        </div>
                        <div className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                          {stat.trend}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl font-bold text-[#2C2C2C] mb-4">
              Why Publish With Us
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Join thousands of researchers who trust JMRH for quality, integrity, and global reach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Rigorous Peer Review',
                description: 'Every submission undergoes double-blind peer review by leading experts in your field'
              },
              {
                icon: '🌍',
                title: 'Global Visibility',
                description: 'Indexed in major databases including Scopus, Web of Science, and Google Scholar'
              },
              {
                icon: '⚡',
                title: 'Fast Publication',
                description: 'Average review time of 21 days with immediate online publication upon acceptance'
              },
              {
                icon: '🔓',
                title: 'Open Access',
                description: 'Make your research freely available to readers worldwide with flexible licensing'
              },
              {
                icon: '📊',
                title: 'Citation Metrics',
                description: 'Track your impact with advanced analytics and citation tracking tools'
              },
              {
                icon: '🤝',
                title: 'Author Support',
                description: 'Dedicated editorial assistance from submission to publication and beyond'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="crystal-card p-8 text-center cursor-pointer group"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#2C2C2C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2C2C] via-[#334155] to-[#2C2C2C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C5A065] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A065] rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Share Your Research?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join our community of scholars and make your mark on the academic world
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/submit-paper"
              className="inline-flex items-center px-10 py-5 bg-[#C5A065] text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-[#d4af75] transition-all duration-300 transform hover:shadow-3xl"
            >
              Start Your Submission
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">JMRH</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advancing knowledge through rigorous peer-reviewed research since 2010
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#C5A065]">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Editorial Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Submission Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ethics Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#C5A065]">For Authors</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Author Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Publication Fees</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Copyright Policy</a></li>
                <li><Link to="/user/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#C5A065]">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: editor@jmrh.org</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li className="flex space-x-4 mt-4">
                  {['twitter', 'linkedin', 'facebook'].map(social => (
                    <a key={social} href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C5A065] transition-colors">
                      <span className="text-xs">•</span>
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Journal of Modern Research in Humanities. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
// Updated for git commit
