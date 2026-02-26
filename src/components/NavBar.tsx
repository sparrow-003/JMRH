import React from 'react'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  const isAdmin = !!JSON.parse(localStorage.getItem('admin_session') || 'null')
  const onLogout = () => {
    localStorage.removeItem('admin_session')
    localStorage.removeItem('user_session')
    window.location.reload()
  }
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="font-semibold">JMRH Admin Portal</span>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <Link to="/">Home</Link>
        <Link to="/user/register">Register</Link>
        <Link to="/user/login">Login</Link>
        {isAdmin && <button className="btn" onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  )
}

export default NavBar
// Updated for git commit
