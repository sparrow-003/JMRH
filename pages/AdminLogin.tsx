
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Shield, Lock, ChevronRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    if (success) navigate('/system/control-panel/dashboard');
    else setError('Unauthorized access attempt logged.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-[3rem] p-12 border border-slate-700 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-5 bg-amber-500/10 rounded-full mb-6">
              <Shield size={40} className="text-amber-500" />
            </div>
            <h1 className="text-3xl font-serif text-white mb-2 tracking-wide">Control Panel</h1>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.4em]">Restricted Access Only</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Administrator ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              />
              <input 
                type="password" 
                placeholder="Secure Key"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              />
            </div>

            {error && <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-widest">{error}</p>}

            <button type="submit" className="w-full py-5 bg-amber-500 text-slate-900 rounded-2xl font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-amber-400 transition-all flex items-center justify-center gap-3">
              Access Dashboard <ChevronRight size={16} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em]">Activity is monitored and logged by IP.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
