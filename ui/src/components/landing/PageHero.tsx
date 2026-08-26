const PageHero = ({ title }: { title: string }) => {
  return (
    <div className="slider-area">
      <div
        className="single-slider section-overly slider-height2 d-flex align-items-center"
        style={{ backgroundImage: "url('/assets/img/hero/about.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap text-center">
                <h2>{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHero
