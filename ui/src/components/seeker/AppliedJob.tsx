
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, } from 'react-toastify'
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaRupeeSign,
  FaBuilding,
  FaCalendarAlt,
} from 'react-icons/fa'
import Layout from '../layout/Layout'
import { getseekerAppliedJobList } from '../../services/service'

const formatDate = (value: any) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const AppliedJob = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getseekerAppliedJobList(data?.token)
        if (res?.success) {
          setJobs(res.result || [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [data?.token])

  console.log(jobs, "##########################");

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
              src={job.recruiter_logo ? `http://localhost:9000/uploads/${job.recruiter_logo}` : '/assets/img/logo/logo.png'}
              alt=""
            />

            <div className="sj-body">
              <div className="sj-top">
                <div>
                  <h5>{job.job_title}</h5>
                  <p className="sj-cat">{job.category}</p>
                  <p className="sj-recruiter"><FaBuilding /> {job.recruiter_name || job.recruiter_name || 'Recruiter'}</p>
                </div>

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
                <div> 

                  {job.status}
                </div>

              </div>
            </div>

            <div className="sj-aside">
              <div className="sj-date">
                <FaCalendarAlt /> Posted on <strong>{formatDate(job.created_at)}</strong>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

export default AppliedJob

