
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Lock, Mail, ChevronRight, Info, GraduationCap, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOP_INDIAN_UNIVERSITIES, PHD_COURSES_INDIA } from '../constants';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: '',
    pincode: '',
    age: '',
    phdStatus: 'Pursuing',
    department: '',
    customDepartment: '',
    institutionName: '',
    customInstitution: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(formData.email, formData.password);
    if (result.success) navigate(redirect);
    else setError(result.error || 'Authentication failed. Please check your credentials.');
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const finalDepartment = formData.department === 'Other' ? formData.customDepartment : formData.department;
    const finalInstitution = formData.institutionName === 'Other' ? formData.customInstitution : formData.institutionName;

    if (!finalDepartment || !finalInstitution) {
      setError("Please specify your Research Discipline and University.");
      setLoading(false);
      return;
    }

    const result = await register({
      ...formData,
      department: finalDepartment,
      institutionName: finalInstitution,
      age: parseInt(formData.age) || 0,
      phdStatus: formData.phdStatus as 'Yes' | 'No' | 'Pursuing'
    });

    if (result.success) navigate(redirect);
    else setError(result.error || 'Registration failed. Please check your network or try a different email.');
    setLoading(false);
  };

  const inputClass = "w-full pl-12 pr-4 py-4 bg-bg border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/10 focus:bg-white transition-all text-sm";
  const selectClass = "w-full px-6 py-4 bg-bg border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/10 focus:bg-white transition-all text-sm appearance-none cursor-pointer";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-2 mb-2 block";

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-20">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-accent/5 border border-slate-100"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              {mode === 'login' ? <Lock size={32} /> : <GraduationCap size={32} />}
            </div>
            <h1 className="text-4xl font-serif text-primary mb-3 leading-none">
              {mode === 'login' ? 'Scholar Login' : 'Scholar Registration'}
            </h1>
            <p className="text-slate-400 text-sm font-light italic">
              {mode === 'login' ? 'Access your research workspace.' : 'Join the international research community.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin} className="space-y-6"
              >
                <div>
                  <label className={labelClass}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="email" value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="scholar@university.ac.in" required />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="password" value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })} className={inputClass} placeholder="••••••••" required />
                  </div>
                </div>
                {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest px-4 py-3 bg-red-50 rounded-xl">{error}</p>}
                <button type="submit" disabled={loading} className="btn-premium w-full flex items-center justify-center gap-3">
                  {loading ? 'Validating...' : 'Secure Access'} <ChevronRight size={16} />
                </button>
                <p className="text-center text-xs text-slate-400 font-medium pt-4">
                  New Scholar? <button type="button" onClick={() => { setMode('register'); setStep(1); }} className="text-primary font-bold hover:underline">Register Account</button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister} className="space-y-6"
              >
                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input type="text" value={formData.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} placeholder="e.g. Rahul" required />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input type="text" value={formData.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} placeholder="e.g. Kumar" required />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Institution Email</label>
                      <input type="email" value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} placeholder="scholar@university.edu" required />
                    </div>
                    <div>
                      <label className={labelClass}>Create Password</label>
                      <input type="password" value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} placeholder="Minimum 6 characters" required />
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="btn-premium w-full">Next: Academic Profile</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>City</label>
                        <input type="text" value={formData.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} required />
                      </div>
                      <div>
                        <label className={labelClass}>Pincode</label>
                        <input type="text" value={formData.pincode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, pincode: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Age</label>
                        <input type="number" value={formData.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} required />
                      </div>
                      <div>
                        <label className={labelClass}>PhD Status</label>
                        <select value={formData.phdStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, phdStatus: e.target.value })} className={selectClass}>
                          <option value="Pursuing">Pursuing PhD</option>
                          <option value="Yes">PhD Awarded</option>
                          <option value="No">Non-PhD Scholar</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>University / Institution</label>
                        <select
                          value={formData.institutionName}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, institutionName: e.target.value })}
                          className={selectClass}
                          required
                        >
                          <option value="">Select Indian University</option>
                          {TOP_INDIAN_UNIVERSITIES.map((u: string) => <option key={u} value={u}>{u}</option>)}
                        </select>
                        {formData.institutionName === 'Other' && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                            <input type="text" placeholder="Type University Name..." value={formData.customInstitution} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, customInstitution: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} required />
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>PhD Course / Research Discipline</label>
                        <select
                          value={formData.department}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, department: e.target.value })}
                          className={selectClass}
                          required
                        >
                          <option value="">Select PhD Discipline</option>
                          {PHD_COURSES_INDIA.map((course: string) => <option key={course} value={course}>{course}</option>)}
                        </select>
                        {formData.department === 'Other' && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                            <input type="text" placeholder="Type Discipline Name..." value={formData.customDepartment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, customDepartment: e.target.value })} className={inputClass.replace('pl-12', 'pl-6')} required />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest px-4 py-3 bg-red-50 rounded-xl">{error}</p>}
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em]">Back</button>
                      <button type="submit" disabled={loading} className="btn-premium flex-[2]">
                        {loading ? 'Creating...' : 'Register Scholar'}
                      </button>
                    </div>
                  </div>
                )}
                <p className="text-center text-xs text-slate-400 font-medium pt-4">
                  Already registered? <button type="button" onClick={() => setMode('login')} className="text-primary font-bold hover:underline">Login Now</button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-12 p-6 bg-bg rounded-[2.5rem] border border-slate-100 flex gap-4 items-start">
            <Info className="text-accent shrink-0 mt-1" size={18} />
            <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
              Verification: Profiles must provide accurate university data to be eligible for publication vetting.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
