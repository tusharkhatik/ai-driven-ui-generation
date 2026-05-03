import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import '../../styles/protected-route.css';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
          <span className="loader-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}