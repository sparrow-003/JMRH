
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Shield, ChevronRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === 'ADMIN') {
      navigate('/system/control-panel/dashboard', { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      // Small delay for smooth transition
      setTimeout(() => {
        navigate('/system/control-panel/dashboard');
      }, 500);
    } else {
      setError('Unauthorized access attempt logged.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-5 bg-accent/10 rounded-full mb-6">
              <Shield size={40} className="text-accent" />
            </div>
            <h1 className="text-3xl font-serif text-primary mb-2 tracking-wide leading-none">Control Panel</h1>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em]">Restricted Access Only</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Administrator ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-bg border border-slate-100 rounded-2xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
              <input
                type="password"
                placeholder="Secure Key"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-bg border border-slate-100 rounded-2xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest bg-red-50 py-3 rounded-xl">{error}</p>}

            <button type="submit" disabled={loading} className="btn-premium w-full flex items-center justify-center gap-3">
              {loading ? 'Validating...' : 'Access Dashboard'} <ChevronRight size={16} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.3em]">Activity is monitored and logged by IP.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
