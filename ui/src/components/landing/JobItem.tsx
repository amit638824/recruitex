import { Link } from 'react-router-dom'

type JobItemProps = {
  img: string
  list?: boolean
}

const JobItem = ({ img, list = false }: JobItemProps) => {
  return (
    <div className="single-job-items mb-30">
      <div className="job-items">
        <div className="company-img">
          <Link to="/job"><img src={img} alt="" /></Link>
        </div>
        <div className={list ? 'job-tittle job-tittle2' : 'job-tittle'}>
          <Link to="/job"><h4>Digital Marketer</h4></Link>
          <ul>
            <li>Creative Agency</li>
            <li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>
            <li>$3500 - $4000</li>
          </ul>
        </div>
      </div>
      <div className={list ? 'items-link items-link2 f-right' : 'items-link f-right'}>
        <Link to="/job">Full Time</Link>
        <span>7 hours ago</span>
      </div>
    </div>
  )
}

export default JobItem
