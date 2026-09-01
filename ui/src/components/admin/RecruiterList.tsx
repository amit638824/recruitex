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
              <div className="col-12 col-lg-6" key={user.id}>
                <div className="uc-card recruiter">
                  <div className="uc-cover">
                    <span className={`uc-status ${active ? 'is-active' : 'is-pending'}`}>
                      <span className="job-card-dot"></span>
                      {active ? 'Active' : 'Pending'}
                    </span>
                    <svg className="uc-skyline" viewBox="0 0 440 140" preserveAspectRatio="xMidYMax slice">
                      <rect x="8" y="62" width="48" height="78" rx="3" fill="#9ec5ff" />
                      <rect x="64" y="28" width="58" height="112" rx="3" fill="#c5dbff" />
                      <rect x="130" y="46" width="44" height="94" rx="3" fill="#7eb3ff" />
                      <rect x="182" y="16" width="70" height="124" rx="3" fill="#d6e6ff" />
                      <rect x="260" y="40" width="52" height="100" rx="3" fill="#8fbbff" />
                      <rect x="320" y="24" width="62" height="116" rx="3" fill="#b7d4ff" />
                      <rect x="390" y="54" width="42" height="86" rx="3" fill="#7aaeff" />
                      <g fill="#fff" opacity="0.45">
                        <rect x="18" y="74" width="8" height="8" rx="1" /><rect x="32" y="74" width="8" height="8" rx="1" />
                        <rect x="18" y="90" width="8" height="8" rx="1" /><rect x="32" y="90" width="8" height="8" rx="1" />
                        <rect x="76" y="42" width="8" height="8" rx="1" /><rect x="90" y="42" width="8" height="8" rx="1" /><rect x="104" y="42" width="8" height="8" rx="1" />
                        <rect x="76" y="58" width="8" height="8" rx="1" /><rect x="90" y="58" width="8" height="8" rx="1" /><rect x="104" y="58" width="8" height="8" rx="1" />
                        <rect x="196" y="32" width="10" height="10" rx="1" /><rect x="214" y="32" width="10" height="10" rx="1" /><rect x="232" y="32" width="10" height="10" rx="1" />
                        <rect x="196" y="50" width="10" height="10" rx="1" /><rect x="214" y="50" width="10" height="10" rx="1" /><rect x="232" y="50" width="10" height="10" rx="1" />
                        <rect x="334" y="40" width="8" height="8" rx="1" /><rect x="348" y="40" width="8" height="8" rx="1" /><rect x="362" y="40" width="8" height="8" rx="1" />
                      </g>
                    </svg>
                    <svg className="uc-wave" viewBox="0 0 500 80" preserveAspectRatio="none">
                      <path d="M0,38 C70,78 110,8 170,42 C230,76 280,12 340,40 C400,68 450,18 500,40 L500,80 L0,80 Z" fill="#fff" />
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
