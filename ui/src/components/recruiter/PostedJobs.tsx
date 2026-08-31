import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaUsers, FaRupeeSign } from 'react-icons/fa'
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
                  <span className="job-card-dot"></span>
                  {job.status}
                </span>

                <div className="job-card-head">
                  <span className="job-card-logo"><FaBriefcase /></span>
                  <div>
                    <h5>{job.job_title}</h5>
                    <small>{job.category}</small>
                  </div>
                </div>

                <div className="job-card-grid">
                  <div>
                    <FaMapMarkerAlt />
                    <span>Location</span>
                    <strong>{job.job_location}</strong>
                  </div>
                  <div>
                    <FaClock />
                    <span>Experience</span>
                    <strong>{job.experience}</strong>
                  </div>
                  <div>
                    <FaRupeeSign />
                    <span>Salary</span>
                    <strong>{job.salary}</strong>
                  </div>
                </div>

                <div className="job-card-open">
                  <FaUsers />
                  <div>
                    <span>Open Positions</span>
                    <strong>{job.vacancies} open</strong>
                  </div>
                </div>

                <Link to="/recruiter/appliedjob" className="btn job-card-btn">
                  <FaUsers /> View Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default PostedJobs
