import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaUsers, FaCheckCircle, FaEnvelope } from 'react-icons/fa'
import Layout from '../layout/Layout'

const stats = [
  { label: 'Jobs Posted', value: '12', icon: <FaBriefcase />, growth: '10%' },
  { label: 'Applications', value: '86', icon: <FaUsers />, growth: '18%' },
  { label: 'Shortlisted', value: '14', icon: <FaCheckCircle />, growth: '6%' },
  { label: 'Messages', value: '11', icon: <FaEnvelope />, growth: '4%' },
]

const posts = [
  { title: 'Senior React Developer', company: 'New applications', status: '12 Applied', date: 'Today' },
  { title: 'UI/UX Designer', company: 'New applications', status: '8 Applied', date: 'Yesterday' },
  { title: 'Backend Engineer', company: 'New applications', status: '21 Applied', date: '3 days ago' },
]

const RecruiterDashboard = () => {
  const data: any = useSelector((state: any) => state.auth)
  const firstName = (data?.name || 'Recruiter').split(' ')[0]

  return (
    <Layout>
      <div className="dash-welcome">
        <h2>Welcome back, {firstName}! 👋</h2>
        <p>Here's an overview of your hiring activity.</p>
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
            <h5>Hiring Overview</h5>
            <svg className="dash-linechart" viewBox="0 0 560 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="recruiterFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb246a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fb246a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50 L560,180 L0,180 Z" fill="url(#recruiterFill)" />
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50" fill="none" stroke="#fb246a" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dash-panel">
            <h5>Applicant Status</h5>
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
            <h5>Latest Job Posts</h5>
            {posts.map((job) => (
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
            <h5>Hiring Tips</h5>
            <div className="dash-job-row">
              <div>
                <strong>Post a new opening</strong>
                <small>Add role, skills and location</small>
              </div>
              <Link to="/recruiter/PostJob" className="btn dash-apply-btn">Open</Link>
            </div>
            <div className="dash-job-row">
              <div>
                <strong>Review applicants</strong>
                <small>Shortlist top matches</small>
              </div>
              <Link to="/recruiter/appliedjob" className="btn dash-apply-btn">Open</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RecruiterDashboard
