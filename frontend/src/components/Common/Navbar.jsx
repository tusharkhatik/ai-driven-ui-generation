import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { FiMenu, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import '../../styles/navbar.css'

const Navbar = ({ onMenuClick }) => {
  const { logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={onMenuClick}>
          <FiMenu size={24} />
        </button>
        <h1 className="navbar-title">🎨 AI UI Generator</h1>
      </div>

      <div className="navbar-right">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <div className="user-section">
          <span className="username">{user?.username}</span>
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar