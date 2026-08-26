import { Link } from 'react-router-dom'

const items = [
  { icon: 'flaticon-tour', title: 'Design & Creative', count: '(653)' },
  { icon: 'flaticon-cms', title: 'Design & Development', count: '(658)' },
  { icon: 'flaticon-report', title: 'Sales & Marketing', count: '(658)' },
  { icon: 'flaticon-app', title: 'Mobile Application', count: '(658)' },
  { icon: 'flaticon-helmet', title: 'Construction', count: '(658)' },
  { icon: 'flaticon-high-tech', title: 'Information Technology', count: '(658)' },
  { icon: 'flaticon-real-estate', title: 'Real Estate', count: '(658)' },
  { icon: 'flaticon-content', title: 'Content Writer', count: '(658)' },
]

const Categories = () => {
  return (
    <div className="our-services section-pad-t30">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <span>FEATURED TOURS Packages</span>
              <h2>Browse Top Categories </h2>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-contnet-center">
          {items.map((item) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={item.title}>
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className={item.icon}></span>
                </div>
                <div className="services-cap">
                  <h5><Link to="/job">{item.title}</Link></h5>
                  <span>{item.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="browse-btn2 text-center mt-50">
              <Link to="/job" className="border-btn2">Browse All Sectors</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
