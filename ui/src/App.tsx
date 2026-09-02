import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/landing/Home';
import FindJob from './components/landing/FindJob';
import About from './components/landing/About';
import Contact from './components/landing/Contact';
import Login from './components/landing/Login';
import Register from './components/landing/Register';
import 'react-toastify/dist/ReactToastify.css'
import AdminDashboard from './components/admin/AdminDashboard';
import RecruiterDashboard from './components/recruiter/RecruiterDashboard';
import SeekerDashboard from './components/seeker/SeekerDashboard';
import SeekerList from './components/admin/SeekerList';
import RecruiterList from './components/admin/RecruiterList';
import JobApply from './components/seeker/JobApply';
import AppliedJob from './components/seeker/AppliedJob';
import PostJob from './components/recruiter/PostJob';
import PostedJobs from './components/recruiter/PostedJobs';
import RecruiterAppliedJob from './components/recruiter/RecruiterAppliedJob';
import AdminUpdateProfile from './components/admin/UpdateProfile';
import RecruiterUpdateProfile from './components/recruiter/UpdateProfile';
import SeekerUpdateProfile from './components/seeker/UpdateProfile';
import AdminJobList from './components/admin/AdminJobList';
import AdminAppliedJob from './components/admin/AdminAppliedJob';
import ProtectedRoute from './components/authGaurd/AuthGaurd';
import NotFound from './components/landing/NotFound';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<FindJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* admin */}
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/seekerlist" element={<ProtectedRoute><SeekerList /></ProtectedRoute>} />
        <Route path="/admin/recruiterlist" element={<ProtectedRoute><RecruiterList /></ProtectedRoute>} />
        <Route path="/admin/joblist" element={<ProtectedRoute><AdminJobList /></ProtectedRoute>} />
        <Route path="/admin/appliedjob" element={<ProtectedRoute><AdminAppliedJob /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><AdminUpdateProfile /></ProtectedRoute>} />
        {/* recruiter */}
        <Route path="/recruiter-dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/recruiter/PostJob" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path="/recruiter/postedjob" element={<ProtectedRoute><PostedJobs /></ProtectedRoute>} />
        <Route path="/recruiter/appliedjob" element={<ProtectedRoute><RecruiterAppliedJob /></ProtectedRoute>} />
        <Route path="/recruiter/profile" element={<ProtectedRoute><RecruiterUpdateProfile /></ProtectedRoute>} />
        {/* seeker */}
        <Route path="/seeker-dashboard" element={<ProtectedRoute><SeekerDashboard /></ProtectedRoute>} />
        <Route path="/seeker/jobapply" element={<ProtectedRoute><JobApply /></ProtectedRoute>} />
        <Route path="/seeker/appliedjob" element={<ProtectedRoute><AppliedJob /></ProtectedRoute>} />
        <Route path="/seeker/profile" element={<ProtectedRoute><SeekerUpdateProfile /></ProtectedRoute>} />
       //page not found
        <Route path='*' element={<NotFound></NotFound>} />
      </Routes>
    </>
  )
}

export default App
