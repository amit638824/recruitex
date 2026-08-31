import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'

const roleLabel: any = {
  seeker: 'Job Seeker',
  recruiter: 'Recruiter',
  admin: 'Admin',
}

const Topbar = () => {
  const [imgError, setImgError] = useState(false)
  const data: any = useSelector((state: any) => state.auth)
  const photo = data?.type === 'recruiter'
    ? (data?.logo || data?.company_logo || data?.img) // for recruiter
    : data?.img // for admin & SEEKER

  useEffect(() => {
    setImgError(false)
  }, [photo])

  return (
    <header className="dash-topbar">
      <div className="dash-top-actions">
        <Link to={data?.type ? `/${data.type}/profile` : '/login'} className="dash-user">
          {photo && !imgError ? (
            <img
              src={`http://localhost:9000/uploads/${photo}`}
              alt=""
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="dash-user-icon">
              <FaUser />
            </span>
          )}
          <div>
            <div className="dash-user-hi">Hi, <strong>{data?.name || 'User'}</strong></div>
            <small>{roleLabel[data?.type] || 'User'}</small>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Topbar
