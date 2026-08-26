import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'

const jobs = [
  { title: 'Software Engineer', company: 'Techverse', location: 'Hyderabad', type: 'Full Time' },
  { title: 'UI/UX Designer', company: 'Crafted', location: 'Pune', type: 'Contract' },
  { title: 'HR Executive', company: 'PeopleFirst', location: 'Delhi', type: 'Full Time' },
  { title: 'Data Analyst', company: 'Insight Co', location: 'Remote', type: 'Remote' },
]

const RecentJob = () => {
  return (
    <section className="rx-section bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <div className="rx-section-kicker">Job listing</div>
          <h2>Recent Job Posted</h2>
        </div>
        <div className="row g-3">
          {jobs.map((job) => (
            <div className="col-12" key={job.title}>
              <div className="rx-job-card d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="rx-icon-wrap mb-0"><FaBriefcase /></div>
                  <div>
                    <h5 className="mb-1">{job.title}</h5>
                    <small className="text-muted">{job.company}</small>
                  </div>
                </div>
                <span className="text-muted"><FaMapMarkerAlt className="me-1" />{job.location}</span>
                <span className="rx-badge-job">{job.type}</span>
                <button className="btn rx-btn-outline btn-sm">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentJob
