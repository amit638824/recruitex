import Navbar from './Navbar'
import PageHero from './PageHero'
import JobItem from './JobItem'
import Footer from './Footer'

const jobs = [
  '/assets/img/icon/job-list1.png',
  '/assets/img/icon/job-list2.png',
  '/assets/img/icon/job-list3.png',
  '/assets/img/icon/job-list4.png',
  '/assets/img/icon/job-list1.png',
  '/assets/img/icon/job-list3.png',
  '/assets/img/icon/job-list4.png',
]

const FindJob = () => {
  return (
    <main>
      <Navbar />
      <PageHero title="Get your job" />
      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="row">
                <div className="col-12">
                  <div className="small-section-tittle2 mb-45">
                    <div className="ion">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="12px">
                        <path fillRule="evenodd" fill="rgb(27, 207, 107)" d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z" />
                      </svg>
                    </div>
                    <h4>Filter Jobs</h4>
                  </div>
                </div>
              </div>
              <div className="job-category-listing mb-50">
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Category</h4>
                  </div>
                  <div className="select-job-items2">
                    <select name="select" defaultValue="">
                      <option value="">All Category</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                      <option value="4">Category 4</option>
                    </select>
                  </div>
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Job Type</h4>
                    </div>
                    <label className="container">Full Time
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Part Time
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Remote
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Freelance
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Location</h4>
                  </div>
                  <div className="select-job-items2">
                    <select name="select" defaultValue="">
                      <option value="">Anywhere</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                      <option value="4">Category 4</option>
                    </select>
                  </div>
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Experience</h4>
                    </div>
                    <label className="container">1-2 Years
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">2-3 Years
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">3-6 Years
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">6-more..
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="single-listing">
                  <div className="select-Categories pb-50">
                    <div className="small-section-tittle2">
                      <h4>Posted Within</h4>
                    </div>
                    <label className="container">Any
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Today
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Last 2 days
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Last 3 days
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Last 5 days
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Last 10 days
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <section className="featured-job-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="count-job mb-35">
                        <span>39, 782 Jobs found</span>
                        <div className="select-job-items">
                          <span>Sort by</span>
                          <select name="select" defaultValue="">
                            <option value="">None</option>
                            <option value="1">job list</option>
                            <option value="2">job list</option>
                            <option value="3">job list</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {jobs.map((img, i) => (
                    <JobItem key={`${img}-${i}`} img={img} list />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-area pb-115 text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-start">
                    <li className="page-item active"><a className="page-link" href="#">01</a></li>
                    <li className="page-item"><a className="page-link" href="#">02</a></li>
                    <li className="page-item"><a className="page-link" href="#">03</a></li>
                    <li className="page-item"><a className="page-link" href="#"><span className="ti-angle-right"></span></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default FindJob
