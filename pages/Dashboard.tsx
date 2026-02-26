
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import AdminDashboard from './dashboards/AdminDashboard';
import ProfessorDashboard from './dashboards/ProfessorDashboard';
import UserDashboard from './dashboards/UserDashboard';

const Dashboard: React.FC = () => {
  const { user, role, isAuthenticated } = useAuth();
  const { id, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Validate security parameters for parallel URL structure
    if (role === 'ADMIN' && token !== user?.secureToken) {
      navigate('/'); // Forbidden/Redirect
    } else if (role !== 'ADMIN' && id !== user?.id) {
      navigate('/'); // Forbidden/Redirect
    }
  }, [isAuthenticated, user, role, id, token, navigate]);

  if (!isAuthenticated) return null;

  // Added explicit handling for the 'PROFESSOR' role which was missing from the UserRole type definition
  switch (role) {
    case 'ADMIN': return <AdminDashboard />;
    case 'PROFESSOR': return <ProfessorDashboard />;
    case 'USER': return <UserDashboard />;
    default: return <div className="py-20 text-center">Unauthorized Role</div>;
  }
};

export default Dashboard;// Updated for git commit
