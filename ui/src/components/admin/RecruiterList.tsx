import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCalendarAlt,
  FaChevronRight, FaCheck,
} from 'react-icons/fa'
import Layout from '../layout/Layout'
import { adminRecruiterListApi } from '../../services/service'

const formatDate = (value: any) => {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const RecruiterPhoto = ({ src }: { src: string }) => {
  const [imgError, setImgError] = useState(false)
  useEffect(() => { setImgError(false) }, [src])
  if (src && !imgError) {
    return <img src={src} alt="" onError={() => setImgError(true)} />
  }
  return <span className="uc-fallback"><FaBuilding /></span>
}

const RecruiterList = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminRecruiterListApi(data?.token)
        if (res?.success) setUsers(res.result || [])
      } finally {
        setLoading(false)
      }
    }
    if (data?.token) load()
    else setLoading(false)
  }, [data?.token])

  return (
    <Layout>
      <div className="dash-welcome d-flex align-items-center flex-wrap gap-2">
        <h2 className="mb-0">Recruiter List</h2>
        <span className="sj-count">{users.length} Recruiters Found</span>
      </div>

      {loading ? (
        <div className="dash-panel"><p className="mb-0">Loading...</p></div>
      ) : users.length === 0 ? (
        <div className="dash-panel"><p className="mb-0">No recruiters found.</p></div>
      ) : (
        <div className="row">
          {users.map((user: any) => {
            const file = user.company_logo || user.img
            const photo = file ? `http://localhost:9000/uploads/${file}` : ''
            const active = !!user.status
            return (
              <div className="col-md-6 col-xl-4" key={user.id}>
                <div className="uc-card recruiter">
                  <div className="uc-cover">
                    <span className={`uc-status ${active ? 'is-active' : 'is-pending'}`}>
                      <span className="job-card-dot"></span>
                      {active ? 'Active' : 'Pending'}
                    </span>
                    <svg className="uc-skyline" viewBox="0 0 400 130" preserveAspectRatio="none">
                      <rect x="20" y="48" width="42" height="82" rx="2" fill="#7eb3ff" />
                      <rect x="70" y="28" width="50" height="102" rx="2" fill="#9bc4ff" />
                      <rect x="128" y="40" width="38" height="90" rx="2" fill="#6aa6ff" />
                      <rect x="175" y="18" width="58" height="112" rx="2" fill="#b7d4ff" />
                      <rect x="242" y="36" width="46" height="94" rx="2" fill="#7eb3ff" />
                      <rect x="296" y="22" width="52" height="108" rx="2" fill="#a8ccff" />
                      <rect x="356" y="50" width="36" height="80" rx="2" fill="#6aa6ff" />
                    </svg>
                  </div>

                  <div className="uc-avatar-wrap">
                    <div className="uc-avatar">
                      <RecruiterPhoto src={photo} />
                    </div>
                    <span className="uc-verified"><FaCheck /></span>
                  </div>

                  <div className="uc-body">
                    <h5>{user.name || 'Recruiter'}</h5>
                    <span className="uc-role">Recruiter</span>

                    <a className="uc-row" href={user.email ? `mailto:${user.email}` : undefined}>
                      <span className="uc-ico"><FaEnvelope /></span>
                      <div>
                        <small>Email</small>
                        <strong>{user.email || '-'}</strong>
                      </div>
                      <FaChevronRight />
                    </a>
                    <a className="uc-row" href={user.contact ? `tel:${user.contact}` : undefined}>
                      <span className="uc-ico"><FaPhone /></span>
                      <div>
                        <small>Phone</small>
                        <strong>{user.contact || '-'}</strong>
                      </div>
                      <FaChevronRight />
                    </a>
                    <div className="uc-row">
                      <span className="uc-ico"><FaMapMarkerAlt /></span>
                      <div>
                        <small>Location</small>
                        <strong>{user.location || '-'}</strong>
                      </div>
                      <FaChevronRight />
                    </div>

                    <div className="uc-joined">
                      <span className="uc-ico"><FaCalendarAlt /></span>
                      <div>
                        <small>Joined On</small>
                        <strong>{formatDate(user.created_at)}</strong>
                      </div>
                      <svg className="uc-hands" viewBox="0 0 80 48" aria-hidden="true">
                        <circle cx="18" cy="16" r="7" fill="#90b8ff" />
                        <circle cx="40" cy="12" r="8" fill="#6a9dff" />
                        <circle cx="62" cy="16" r="7" fill="#90b8ff" />
                        <path d="M10,46 C12,32 26,30 40,34 C54,30 68,32 70,46 Z" fill="#c5d9ff" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Layout>
  )
}

export default RecruiterList
