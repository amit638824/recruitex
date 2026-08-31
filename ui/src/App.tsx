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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/seekerlist" element={<SeekerList />} />
        <Route path="/admin/recruiterlist" element={<RecruiterList />} />
        <Route path="/admin/joblist" element={<AdminJobList />} />
        <Route path="/admin/profile" element={<AdminUpdateProfile />} />
        {/* recruiter */}
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/PostJob" element={<PostJob />} />
        <Route path="/recruiter/postedjob" element={<PostedJobs />} />
        <Route path="/recruiter/appliedjob" element={<RecruiterAppliedJob />} />
        <Route path="/recruiter/profile" element={<RecruiterUpdateProfile />} />
        {/* seeker */}
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/jobapply" element={<JobApply />} />
        <Route path="/seeker/appliedjob" element={<AppliedJob />} />
        <Route path="/seeker/profile" element={<SeekerUpdateProfile />} />

      </Routes>
    </>
  )
}

export default App
