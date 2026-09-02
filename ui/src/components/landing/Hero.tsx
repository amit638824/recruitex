import Typewriter from 'typewriter-effect';
const Hero = () => {
  return (
    <div className="slider-area">
      <div
        className="single-slider slider-height d-flex align-items-center"
        style={{
          backgroundImage: "url('/assets/img/hero/h1_hero.jpg')",
          backgroundPosition: 'right top',
          backgroundSize: 'cover',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-9 col-md-10">
              <div className="hero__caption">
                <h1>
                  Find the most exciting
                  <Typewriter
                    options={{
                      strings: ['Startup jobs'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Hero
