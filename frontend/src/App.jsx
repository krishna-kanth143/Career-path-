import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import CareerRecommendation from './pages/CareerRecommendation';
import CareerDetails from './pages/CareerDetails';
import UserProgressPage from './pages/UserProgressPage';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AddCoursePage from './pages/AddCoursePage';
import './index.css';

// Simple Auth Guard
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

// Admin Guard
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'ADMIN' ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/courses" element={
              <PrivateRoute><CoursesPage /></PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute><UserDashboard /></PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute><UserProfile /></PrivateRoute>
            } />
            <Route path="/recommendations" element={
              <PrivateRoute><CareerRecommendation /></PrivateRoute>
            } />
            <Route path="/career/:id" element={
              <PrivateRoute><CareerDetails /></PrivateRoute>
            } />
            <Route path="/progress" element={
              <PrivateRoute><UserProgressPage /></PrivateRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute><AdminDashboard /></AdminRoute>
            } />
            <Route path="/admin/add-course" element={
              <AdminRoute><AddCoursePage /></AdminRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
