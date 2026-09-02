import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBriefcase,
  FaUser, FaCalendarAlt, FaChevronRight, FaCloudUploadAlt, FaFileAlt,
} from 'react-icons/fa'
import Layout from '../layout/Layout'
import { adminSeekerListApi } from '../../services/service'

const formatDate = (value: any) => {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const SeekerPhoto = ({ src }: { src: string }) => {
  const [imgError, setImgError] = useState(false)
  useEffect(() => { setImgError(false) }, [src])
  if (src && !imgError) {
    return <img src={src} alt="" onError={() => setImgError(true)} />
  }
  return <span className="uc-fallback"><FaUser /></span>
}

const SeekerList = () => {
  const data: any = useSelector((state: any) => state.auth)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminSeekerListApi(data?.token)
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
      <div className="dash-welcome">
        <h2 className="mb-0">Seeker List</h2>
      </div>

      {loading ? (
        <div className="dash-panel"><p className="mb-0">Loading...</p></div>
      ) : users.length === 0 ? (
        <div className="dash-panel"><p className="mb-0">No seekers found.</p></div>
      ) : (
        <div className="row">
          {users.map((user: any) => {
            const photo = user.img ? `http://localhost:9000/uploads/${user.img}` : ''
            const active = !!user.status
            return (
              <div className="col-md-6 col-xl-4" key={user.id}>
                <div className="uc-card seeker">
                  <div className="uc-cover">
                    <span className={`uc-status ${active ? 'is-active' : 'is-pending'}`}>
                      <span className="job-card-dot"></span>
                      {active ? 'Active' : 'Pending'}
                    </span>
                    <svg className="uc-wave" viewBox="0 0 500 80" preserveAspectRatio="none">
                      <path d="M0,38 C70,78 110,8 170,42 C230,76 280,12 340,40 C400,68 450,18 500,40 L500,80 L0,80 Z" fill="#fff" />
                    </svg>
                  </div>

                  <div className="uc-avatar">
                    <SeekerPhoto src={photo} />
                  </div>

                  <div className="uc-body">
                    <h5>{user.name || 'Seeker'}</h5>
                    <span className="uc-role">Job Seeker</span>

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

                    <div className="uc-mini-grid">
                      <div className="uc-mini">
                        <span className="uc-ico"><FaGraduationCap /></span>
                        <div>
                          <small>Qualification</small>
                          <strong>{user.qualification || '-'}</strong>
                        </div>
                      </div>
                      <div className="uc-mini">
                        <span className="uc-ico"><FaBriefcase /></span>
                        <div>
                          <small>Skills</small>
                          <strong>{user.preference || '-'}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="uc-row">
                      <span className="uc-ico"><FaCalendarAlt /></span>
                      <div>
                        <small>Joined On</small>
                        <strong>{formatDate(user.created_at)}</strong>
                      </div>
                    </div>

                    {user.resume ? (
                      <a
                        className="uc-foot"
                        href={`http://localhost:9000/uploads/${user.resume}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFileAlt /> View Resume
                      </a>
                    ) : (
                      <div className="uc-foot is-empty">
                        <FaCloudUploadAlt /> No resume uploaded
                      </div>
                    )}
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

export default SeekerList
