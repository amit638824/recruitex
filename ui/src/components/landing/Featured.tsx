import { Link } from 'react-router-dom'
import JobItem from './JobItem'

const jobs = [
  '/assets/img/icon/job-list1.png',
  '/assets/img/icon/job-list2.png',
  '/assets/img/icon/job-list3.png',
  '/assets/img/icon/job-list4.png',
]

const Featured = () => {
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
              {jobs.map((img) => (
                <JobItem key={img} img={img} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Featured
