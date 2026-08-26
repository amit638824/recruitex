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
        {/* //admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />

      </Routes>
    </>
  )
}

export default App
