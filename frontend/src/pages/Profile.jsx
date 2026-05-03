import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

export default function Profile() {
  const { user, logout, updateUser, stats } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
        return;
      }

      updateUser(data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage({ type: 'error', text: 'Error updating profile' });

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">

      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft /> Back
      </button>

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || '?'}
          </div>

          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>
              Member since{' '}
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">Generated UIs</span>
            <span className="stat-value">{stats?.totalPrompts || 0}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Saved</span>
            <span className="stat-value">{stats?.totalSaved || 0}</span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="profile-form">

          <div className="form-group">
            <label><FaUser /> Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} className="update-btn">
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

        </form>

        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>

      </div>
    </div>
  );
}