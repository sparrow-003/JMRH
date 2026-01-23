
import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './components/AuthContext';
import ChatAssistant from './components/ChatAssistant';
import Lenis from 'lenis';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const EditorialBoard = lazy(() => import('./pages/EditorialBoard'));
const ReviewerBoard = lazy(() => import('./pages/ReviewerBoard'));
const ReviewPolicy = lazy(() => import('./pages/ReviewPolicy'));
const AuthorGuidelines = lazy(() => import('./pages/AuthorGuidelines'));
const EthicsPolicy = lazy(() => import('./pages/EthicsPolicy'));
const Archives = lazy(() => import('./pages/Archives'));
const SubmitPaper = lazy(() => import('./pages/SubmitPaper'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/dashboards/AdminDashboard'));

const LoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white">
    <div className="w-12 h-12 border border-slate-200 border-t-blue-900 rounded-full animate-spin"></div>
    <p className="mt-8 text-[9px] text-slate-400 font-bold uppercase tracking-[0.5em] animate-pulse">Establishing Secure Session</p>
  </div>
);

// High-security guard for Administrative routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { role, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingFallback />;
  
  if (!isAuthenticated || role !== 'ADMIN') {
    // Redirect to the hidden admin login if unauthorized
    return <Navigate to="/system/control-panel/login" replace />;
  }

  return <>{children}</>;
};

const ScrollAndLog = () => {
  const { logVisit } = useAuth();
  const location = useLocation();

  useEffect(() => {
    logVisit(location.pathname);
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const AppContent: React.FC = () => {
  const { isLoading } = useAuth();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (isLoading) return <LoadingFallback />;

  return (
    <Router>
      <ScrollAndLog />
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/editorial" element={<EditorialBoard />} />
            <Route path="/reviewer" element={<ReviewerBoard />} />
            <Route path="/review-policy" element={<ReviewPolicy />} />
            <Route path="/guidelines" element={<AuthorGuidelines />} />
            <Route path="/ethics" element={<EthicsPolicy />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/submit" element={<SubmitPaper />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/system/control-panel/login" element={<AdminLogin />} />
            
            {/* Protected Admin Dashboard */}
            <Route 
              path="/system/control-panel/dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            <Route path="/user/:id" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Layout>
      <ChatAssistant />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
