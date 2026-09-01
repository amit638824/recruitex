import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaUsers, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { recruiterDashboardApi } from '../../services/service'

const RecruiterDashboard = () => {
  const data: any = useSelector((state: any) => state.auth)
  const firstName = (data?.name || 'Recruiter').split(' ')[0]
  const [dash, setDash] = useState<any>({})

  useEffect(() => {
    const load = async () => {
      const res = await recruiterDashboardApi(data?.token)
      if (res?.success) setDash(res.result || {})
    }
    if (data?.token) load()
  }, [data?.token])

  const stats = [
    { label: 'Jobs Posted', value: dash.jobsPosted || 0, icon: <FaBriefcase /> },
    { label: 'Applications', value: dash.applications || 0, icon: <FaUsers /> },
    { label: 'Hired', value: dash.hired || 0, icon: <FaCheckCircle /> },
    { label: 'Pending', value: dash.pending || 0, icon: <FaHourglassHalf /> },
  ]

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
            {(dash.latestJobs || []).length === 0 ? (
              <p className="mb-0">No jobs posted yet.</p>
            ) : (
              dash.latestJobs.map((job: any) => (
                <div className="dash-job-row" key={job.id}>
                  <div>
                    <strong>{job.job_title}</strong>
                    <small>{job.job_location} · {job.job_type}</small>
                  </div>
                  <span className="dash-status">{job.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="dash-panel">
            <h5>Quick Actions</h5>
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
