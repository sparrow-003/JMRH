import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { JMRHProvider } from "@/context/JMRHContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public Pages
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GuidelinesPage = lazy(() => import("./pages/GuidelinesPage"));
const EditorialPage = lazy(() => import("./pages/EditorialPage"));
const EthicsPage = lazy(() => import("./pages/EthicsPage"));
const ArchivesPage = lazy(() => import("./pages/ArchivesPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Secure Auth
const SecureLoginPage = lazy(() => import("./pages/SecureLoginPage"));

// User Pages
const SubmitPaperPage = lazy(() => import("./pages/SubmitPaperPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

// Admin Dashboard
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminProfessors = lazy(() => import("./pages/admin/AdminProfessors"));
const AdminPapers = lazy(() => import("./pages/admin/AdminPapers"));

// Professor Dashboard
const ProfessorDashboard = lazy(() => import("./pages/professor/ProfessorDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <JMRHProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingOverlay />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/editorial-board" element={<EditorialPage />} />
              <Route path="/ethics-policy" element={<EthicsPage />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />

              {/* User Secure Routes - Submit Paper publicly viewable, action blocked at page level */}
              <Route path="/submit-paper" element={<SubmitPaperPage />} />
              <Route path="/submit-paper/:id" element={<SubmitPaperPage />} />
              <Route path="/account" element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <AccountPage />
                </ProtectedRoute>
              } />

              {/* Secure Admin Console */}
              <Route path="/secure/admin/login" element={<SecureLoginPage role="ADMIN" />} />
              <Route path="/secure/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/secure/admin/users" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
              <Route path="/secure/admin/professors" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminProfessors />
                </ProtectedRoute>
              } />
              <Route path="/secure/admin/papers" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminPapers />
                </ProtectedRoute>
              } />

              {/* Secure Professor Console */}
              <Route path="/secure/professor/login" element={<SecureLoginPage role="PROFESSOR" />} />
              <Route path="/secure/professor/dashboard" element={
                <ProtectedRoute allowedRoles={['PROFESSOR']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/secure/professor/papers" element={
                <ProtectedRoute allowedRoles={['PROFESSOR']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </JMRHProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
