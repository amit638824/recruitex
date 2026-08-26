import { Link } from 'react-router-dom'

const posts = [
  '/assets/img/blog/home-blog1.jpg',
  '/assets/img/blog/home-blog2.jpg',
]

const RecentNews = () => {
  return (
    <div className="home-blog-area blog-h-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center">
              <span>Our latest blog</span>
              <h2>Our recent news</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {posts.map((img) => (
            <div className="col-xl-6 col-lg-6 col-md-6" key={img}>
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src={img} alt="" />
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>|   Properties</p>
                    <h3><Link to="/about">Footprints in Time is perfect House in Kurashiki</Link></h3>
                    <a href="#" className="more-btn">Read more »</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentNews
