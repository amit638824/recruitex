import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa'
import { publicJobsList, seekerApplyJob } from '../../services/service'

const formatDate = (value: any) => {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const Featured = () => {
  const navigate = useNavigate()
  const data: any = useSelector((state: any) => state.auth)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<any[]>([])
  const [applying, setApplying] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await publicJobsList()
        if (res?.success) setJobs((res.result || []).slice(0, 5))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleApply = async (jobId: any) => {
    if (!data?.token || data?.type !== 'seeker') {
      navigate('/login')
      return
    }
    try {
      setApplying(jobId)
      const res = await seekerApplyJob({ job_id: jobId }, data?.token)
      if (res?.success) {
        toast.success(res.message || 'Applied successfully')
      } else {
        toast.error(res?.message || 'Apply failed')
      }
    } catch {
      toast.error('Internal Server error')
    } finally {
      setApplying(null)
    }
  }

  const toggleWish = (jobId: any) => {
    setWishlist((prev) => prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId])
  }

  return (
    <>
      <div
        className="online-cv cv-bg section-overly pt-90 pb-120"
        style={{ backgroundImage: "url('/assets/img/gallery/cv_bg.jpg')" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="cv-caption text-center">
                <p className="pera1">FEATURED TOURS Packages</p>
                <p className="pera2"> Make a Difference with Your Online Resume!</p>
                <Link to="/register" className="border-btn2 border-btn4">Upload your cv</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="featured-job-area feature-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Recent Job</span>
                <h2>Featured Jobs</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
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
                        <span className={`job-card-badge ${job.status === 'pending' ? 'is-pending' : 'is-active'}`}>
                          <span className="job-card-dot"></span>
                          {job.status}
                        </span>
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
                          type="button"
                          className="btn sj-apply"
                          disabled={applying === job.id}
                          onClick={() => handleApply(job.id)}
                        >
                          <FaBriefcase /> {applying === job.id ? 'Applying...' : 'Apply This Job'}
                        </button>
                        <button
                          type="button"
                          className={`sj-wish ${wishlist.includes(job.id) ? 'active' : ''}`}
                          onClick={() => toggleWish(job.id)}
                          aria-label="Wishlist"
                        >
                          {wishlist.includes(job.id) ? <FaHeart /> : <FaRegHeart />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Featured
