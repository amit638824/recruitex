import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaUsers, FaRupeeSign, FaLayerGroup } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { recruiterPostedJobs } from '../../services/service'

const PostedJobs = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await recruiterPostedJobs(data?.token)
        if (res?.success) {
          setJobs(res.result || [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [data?.token])

  return (
    <Layout>
      <div className="dash-welcome d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2>Posted Jobs</h2>
          <p>Jobs you have posted for seekers.</p>
        </div>
        <Link to="/recruiter/PostJob" className="btn dash-post-btn">Post a Job</Link>
      </div>

      {loading ? (
        <div className="dash-panel"><p className="mb-0">Loading...</p></div>
      ) : jobs.length === 0 ? (
        <div className="dash-panel"><p className="mb-0">No jobs posted yet.</p></div>
      ) : (
        <div className="row">
          {jobs.map((job: any) => (
            <div className="col-md-6 col-xl-4" key={job.id}>
              <div className="job-card">
                <span className={`job-card-badge ${job.status === 'pending' ? 'is-pending' : 'is-active'}`}>
                  {job.status}
                </span>
                <div className="job-card-icon">
                  <FaBriefcase />
                </div>
                <h5>{job.job_title}</h5>
                <ul className="job-card-meta">
                  <li><FaLayerGroup /> {job.category}</li>
                  <li><FaMapMarkerAlt /> {job.job_location}</li>
                  <li><FaClock /> {job.job_type} · {job.experience}</li>
                  <li><FaRupeeSign /> {job.salary}</li>
                  <li><FaUsers /> {job.vacancies} open</li>
                </ul>
                <Link to="/recruiter/appliedjob" className="btn job-card-btn">View Applicants</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default PostedJobs
