import Hero from './Hero'
import Categories from './Categories'
import Featured from './Featured'
import ApplyProcess from './ApplyProcess'
import Testimonial from './Testimonial'
import Doing from './Doing'
import RecentNews from './RecentNews'
import Footer from './Footer'
import Navbar from './Navbar'
const Home = () => {
  return (
    <>
    <Navbar />
      <Hero />
      <Categories />
      <Featured />
      <ApplyProcess />
      <Testimonial />
      <Doing />
      <RecentNews />
      <Footer />
    </>
  )
}

export default Home
