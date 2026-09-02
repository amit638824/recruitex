import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaRupeeSign,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaUserGraduate,
  FaFileAlt,
  FaBriefcase,
  FaCheck,
  FaTimes,
} from 'react-icons/fa'
import Layout from '../layout/Layout'
import { getrecruterAppliedJobList, updateRecruiterAppliedJobStatus } from '../../services/service'
import { UPLOAD_BASE, formatDate, applicationStatusClass } from '../../utils/format'
import { InfoItem, JobChip } from '../shared/AppliedCardParts'

const RecruiterAppliedJob = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getrecruterAppliedJobList(data?.token)
        if (res?.success) setApplications(res.result || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [data?.token])

  const handleStatus = async (appliedId: number, status: 'hired' | 'rejected') => {
    if (!appliedId || updatingId) return
    setUpdatingId(appliedId)
    try {
      const res = await updateRecruiterAppliedJobStatus(appliedId, status, data?.token)
      if (res?.success) {
        setApplications((prev) =>
          prev.map((row) =>
            Number(row.applied_id) === Number(appliedId)
              ? { ...row, application_status: status }
              : row,
          ),
        )
        toast.success(res.message || `Marked as ${status}`)
      } else {
        toast.error(res?.message || 'Failed to update status')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <Layout>
      <div className="dash-welcome">
        <h2 className="mb-0">Applied Candidates</h2>
      </div>

      {loading ? (
        <div className="dash-panel"><p className="mb-0">Loading...</p></div>
      ) : applications.length === 0 ? (
        <div className="dash-panel"><p className="mb-0">No applications found.</p></div>
      ) : (
        applications.map((row: any) => {
          const profileSrc = row.seeker_profile
            ? `${UPLOAD_BASE}/${row.seeker_profile}`
            : '/assets/img/logo/logo.png'
          const resumeUrl = row.seeker_resume
            ? `${UPLOAD_BASE}/${row.seeker_resume}`
            : null
          const appStatus = String(row.application_status || 'pending').toLowerCase()
          const busy = updatingId === Number(row.applied_id)

          return (
            <article className="rac-card" key={row.applied_id || `${row.job_id}-${row.seeker_id}`}>
              <div className="rac-header">
                <div className="rac-identity">
                  <img className="rac-avatar" src={profileSrc} alt={row.seeker_name || 'Applicant'} />
                  <div>
                    <h3>{row.seeker_name || 'Applicant'}</h3>
                    <p className="rac-applied-for">
                      <FaBriefcase /> Applied for: <strong>{row.job_title || '—'}</strong>
                    </p>
                    <p className="rac-sub">
                      <FaBuilding /> {row.category || 'General'} · {row.job_type || '—'}
                    </p>
                  </div>
                </div>

                <div className="rac-header-right">
                  <span className={applicationStatusClass(appStatus)}>{appStatus}</span>
                  <div className="rac-applied-date">
                    <FaCalendarAlt /> Applied on <strong>{formatDate(row.applied_at)}</strong>
                  </div>
                  <div className="rac-actions">
                    <button
                      type="button"
                      className="rac-btn rac-btn-hire"
                      disabled={busy || appStatus === 'hired'}
                      onClick={() => handleStatus(Number(row.applied_id), 'hired')}
                    >
                      <FaCheck /> Hired
                    </button>
                    <button
                      type="button"
                      className="rac-btn rac-btn-reject"
                      disabled={busy || appStatus === 'rejected'}
                      onClick={() => handleStatus(Number(row.applied_id), 'rejected')}
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              </div>

              <div className="rac-section">
                <h4>Applicant Details</h4>
                <div className="rac-info-grid">
                  <InfoItem icon={<FaEnvelope />} label="Email" value={row.seeker_email || '—'} />
                  <InfoItem icon={<FaPhone />} label="Contact" value={row.seeker_contact || '—'} />
                  <InfoItem icon={<FaMapMarkerAlt />} label="Location" value={row.seeker_location || '—'} />
                  <InfoItem icon={<FaUserGraduate />} label="Qualification" value={row.seeker_qualification || '—'} />
                  <InfoItem icon={<FaBriefcase />} label="Preference" value={row.seeker_preference || '—'} />
                  <InfoItem
                    icon={<FaFileAlt />}
                    label="Resume"
                    value={
                      resumeUrl ? (
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View resume</a>
                      ) : (
                        'Not uploaded'
                      )
                    }
                  />
                </div>
              </div>

              <div className="rac-section">
                <h4>Job Details</h4>
                <div className="rac-job-grid">
                  <JobChip icon={<FaMapMarkerAlt />} label="Job Location" value={row.job_location || '—'} />
                  <JobChip icon={<FaClock />} label="Experience" value={row.experience || '—'} />
                  <JobChip icon={<FaRupeeSign />} label="Salary" value={row.salary ? `₹ ${row.salary}` : '—'} />
                  <JobChip icon={<FaUsers />} label="Open Positions" value={`${row.vacancies ?? '—'} open`} />
                  <JobChip icon={<FaBuilding />} label="Job Status" value={row.job_status || '—'} />
                </div>
              </div>

              <div className="rac-footer">
                <span>
                  <FaCalendarAlt /> Job posted on <strong>{formatDate(row.job_posted_at)}</strong>
                </span>
              </div>
            </article>
          )
        })
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

export default RecruiterAppliedJob
