import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaSignOutAlt,
  FaBriefcase,
  FaCheckCircle,
  FaUser,
  FaUserEdit,
} from 'react-icons/fa'
import { logOut } from '../../redux/slices/authSlice'

const menus: any = {
  admin: [
    { label: 'Dashboard', path: '/admin-dashboard', icon: <FaHome /> },
    { label: 'Seeker List', path: '/admin/seekerlist', icon: <FaUsers /> },
    { label: 'Recruiter List', path: '/admin/recruiterlist', icon: <FaUserTie /> },
    { label: 'Update Profile', path: '/admin/profile', icon: <FaUserEdit /> },
  ],
  seeker: [
    { label: 'Dashboard', path: '/seeker-dashboard', icon: <FaHome /> },
    { label: 'Apply Job', path: '/seeker/jobapply', icon: <FaBriefcase /> },
    { label: 'Applied Job', path: '/seeker/appliedjob', icon: <FaCheckCircle /> },
    { label: 'Update Profile', path: '/seeker/profile', icon: <FaUserEdit /> },
  ],
  recruiter: [
    { label: 'Dashboard', path: '/recruiter-dashboard', icon: <FaHome /> },
    { label: 'Job Post', path: '/recruiter/PostJob', icon: <FaBriefcase /> },
    { label: 'Posted Jobs', path: '/recruiter/postedjob', icon: <FaUser /> },
    { label: 'Applied Job', path: '/recruiter/appliedjob', icon: <FaCheckCircle /> },
    { label: 'Update Profile', path: '/recruiter/profile', icon: <FaUserEdit /> },
  ],
}
  
const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data: any = useSelector((state: any) => state.auth)
  const userType = data?.type
  const items = menus[userType] || []  
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <aside className="dash-sidebar">
      <Link to="/" className="dash-brand">
        <img
          className="dash-brand-logo"
          src="/assets/img/logo/logo.png"
          alt="RecruiteX"
        />
      </Link>

      <ul className="dash-menu">
        {items.map((item: any) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `dash-link ${isActive ? 'active' : ''}`}
            >
              <span className="dash-link-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
        <button type="button" className="dash-link dash-logout" onClick={handleLogout}>
        <span className="dash-link-icon"><FaSignOutAlt /></span>
        LogOut
      </button> 
      </ul>

      
    </aside>
  )
}

export default Sidebar
