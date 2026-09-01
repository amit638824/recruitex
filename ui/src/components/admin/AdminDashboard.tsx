import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaUsers, FaUserTie, FaBriefcase, FaCheckCircle } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { adminDashboardApi } from '../../services/service'

const AdminDashboard = () => {
  const data: any = useSelector((state: any) => state.auth)
  const firstName = (data?.name || 'Admin').split(' ')[0]
  const [dash, setDash] = useState<any>({})

  useEffect(() => {
    const load = async () => {
      const res = await adminDashboardApi(data?.token)
      if (res?.success) setDash(res.result || {})
    }
    if (data?.token) load()
  }, [data?.token])

  const stats = [
    { label: 'Seekers', value: dash.seekers || 0, icon: <FaUsers /> },
    { label: 'Recruiters', value: dash.recruiters || 0, icon: <FaUserTie /> },
    { label: 'Jobs', value: dash.jobs || 0, icon: <FaBriefcase /> },
    { label: 'Applications', value: dash.applications || 0, icon: <FaCheckCircle /> },
  ]

  return (
    <Layout>
      <div className="dash-welcome">
        <h2>Welcome back, {firstName}! 👋</h2>
        <p>Here's what's happening across RecruiteX today.</p>
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
            <h5>Platform Overview</h5>
            <svg className="dash-linechart" viewBox="0 0 560 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb246a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fb246a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50 L560,180 L0,180 Z" fill="url(#adminFill)" />
              <path d="M0,140 C70,120 110,80 180,90 C250,100 280,40 350,55 C420,70 470,30 560,50" fill="none" stroke="#fb246a" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="dash-panel">
            <h5>User Mix</h5>
            <div className="dash-donut-wrap">
              <div className="dash-donut"></div>
              <ul className="dash-legend">
                <li><span className="lg lg-1"></span> Seekers</li>
                <li><span className="lg lg-2"></span> Recruiters</li>
                <li><span className="lg lg-3"></span> Jobs</li>
                <li><span className="lg lg-4"></span> Pending</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="dash-panel">
            <h5>Recent Jobs</h5>
            {(dash.recentJobs || []).length === 0 ? (
              <p className="mb-0">No jobs yet.</p>
            ) : (
              dash.recentJobs.map((job: any) => (
                <div className="dash-job-row" key={job.id}>
                  <div>
                    <strong>{job.job_title}</strong>
                    <small>{job.job_location} · {job.category}</small>
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
                <strong>Review seeker list</strong>
                <small>Verify new accounts</small>
              </div>
              <Link to="/admin/seekerlist" className="btn dash-apply-btn">Open</Link>
            </div>
            <div className="dash-job-row">
              <div>
                <strong>Review recruiter list</strong>
                <small>Approve companies</small>
              </div>
              <Link to="/admin/recruiterlist" className="btn dash-apply-btn">Open</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
