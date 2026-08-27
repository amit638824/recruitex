import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaBookmark, FaEye, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Layout from '../layout/Layout'

const stats = [
  { label: 'Applications', value: '24', icon: <FaBriefcase />, growth: '12%' },
  { label: 'Saved Jobs', value: '18', icon: <FaBookmark />, growth: '8%' },
  { label: 'Profile Views', value: '156', icon: <FaEye />, growth: '24%' },
  { label: 'Messages', value: '09', icon: <FaEnvelope />, growth: '5%' },
]

const applied = [
  { title: 'Frontend Developer', company: 'TechNova', status: 'Under Review', date: '2 days ago' },
  { title: 'React Engineer', company: 'Pixel Labs', status: 'Shortlisted', date: '5 days ago' },
  { title: 'UI Developer', company: 'BrightSoft', status: 'Applied', date: '1 week ago' },
]

const recommended = [
  { title: 'MERN Stack Developer', company: 'CodeCraft', location: 'Remote' },
  { title: 'JavaScript Engineer', company: 'Cloudify', location: 'Bengaluru' },
  { title: 'Web Designer', company: 'Studio 9', location: 'Pune' },
]

const SeekerDashboard = () => {
  const data: any = useSelector((state: any) => state.auth)
  const firstName = (data?.name || 'Seeker').split(' ')[0]

  return (
    <Layout>
      <div className="dash-welcome">
        <h2>Welcome back, {firstName}! 👋</h2>
        <p>Here's what's happening with your job search today.</p>
      </div>

      <div className="row">
        {stats.map((item) => (
          <div className="col-md-6 col-xl-3" key={item.label}>
            <div className="dash-stat">
              <span className="dash-stat-icon">{item.icon}</span>
              <div>
                <small>{item.label}</small>
                <h4>{item.value}</h4>
                <span className="dash-stat-growth">↗ {item.growth} this month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="dash-panel">
            <h5>Applications Overview</h5>
            <svg className="dash-linechart" viewBox="0 0 560 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="seekerFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb246a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fb246a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50 L560,180 L0,180 Z" fill="url(#seekerFill)" />
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50" fill="none" stroke="#fb246a" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dash-panel">
            <h5>Application Status</h5>
            <div className="dash-donut-wrap">
              <div className="dash-donut"></div>
              <ul className="dash-legend">
                <li><span className="lg lg-1"></span> Applied</li>
                <li><span className="lg lg-2"></span> Under Review</li>
                <li><span className="lg lg-3"></span> Shortlisted</li>
                <li><span className="lg lg-4"></span> Rejected</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="dash-panel">
            <h5>Recently Applied Jobs</h5>
            {applied.map((job) => (
              <div className="dash-job-row" key={job.title}>
                <div>
                  <strong>{job.title}</strong>
                  <small>{job.company}</small>
                </div>
                <span className="dash-status">{job.status}</span>
                <small className="dash-job-date">{job.date}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="dash-panel">
            <h5>Recommended Jobs</h5>
            {recommended.map((job) => (
              <div className="dash-job-row" key={job.title}>
                <div>
                  <strong>{job.title}</strong>
                  <small><FaMapMarkerAlt /> {job.location}</small>
                </div>
                <Link to="/seeker/jobapply" className="btn dash-apply-btn">Apply Now</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SeekerDashboard
