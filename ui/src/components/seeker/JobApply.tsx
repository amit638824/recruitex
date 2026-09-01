import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaRupeeSign,
  FaBuilding,
  FaCalendarAlt,
  FaBriefcase,
} from 'react-icons/fa'
import Layout from '../layout/Layout'
import { adminPostedJobsList, seekerAppliedJob } from '../../services/service'
import { useNavigate } from 'react-router-dom'

const formatDate = (value: any) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const JobApply = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminPostedJobsList(data?.token)
        if (res?.success) {
          setJobs(res.result || [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [data?.token])

  const handleapplyJob = async (job_id: any) => {
    const payload = { job_id }
    const res = await seekerAppliedJob(payload, data?.token)
    if (res?.success) {
      toast.success(res?.message)
      nav('/seeker/appliedjob')
    } else {
      toast.error(res?.message)
    }
  }

  return (
    <Layout>
      <div className="dash-welcome d-flex align-items-center flex-wrap gap-2">
        <h2 className="mb-0">All Jobs</h2>
        <span className="sj-count">{jobs.length} Jobs Found</span>
      </div>

      {loading ? (
        <div className="dash-panel"><p className="mb-0">Loading...</p></div>
      ) : jobs.length === 0 ? (
        <div className="dash-panel"><p className="mb-0">No jobs found.</p></div>
      ) : (
        jobs.map((job: any) => (
          <div className="sj-card" key={job.id}>
            <img
              className="sj-logo"
              src={job.user_company_logo ? `http://localhost:9000/uploads/${job.user_company_logo}` : '/assets/img/logo/logo.png'}
              alt=""
            />

            <div className="sj-body">
              <div className="sj-top">
                <div>
                  <h5>{job.job_title}</h5>
                  <p className="sj-cat">{job.category}</p>
                  <p className="sj-recruiter"><FaBuilding /> {job.name || job.user_name || 'Recruiter'}</p>
                </div>
                {/* <span className={`job-card-badge ${job.status === 'pending' ? 'is-pending' : 'is-active'}`}>
                  <span className="job-card-dot"></span>
                  {job.status}
                </span> */}
              </div>

              <div className="sj-meta">
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
                  <strong>₹ {job.salary}</strong>
                </div>
                <div>
                  <FaUsers />
                  <span>Open Positions</span>
                  <strong>{job.vacancies} open</strong>
                </div>
              </div>
            </div>

            <div className="sj-aside">
              <div className="sj-date">
                <FaCalendarAlt /> Posted on <strong>{formatDate(job.created_at)}</strong>
              </div>
              <div className="sj-actions">
                <button
                  onClick={() => handleapplyJob(job?.id)}
                  type="button"
                  className="btn sj-apply"
                >
                  <FaBriefcase /> Apply This Job
                </button>

              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

export default JobApply
