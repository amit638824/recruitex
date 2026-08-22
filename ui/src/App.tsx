import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from 'react-router-dom'
import Home from './components/landing/Home';
import FindJob from './components/landing/FindJob';
import About from './components/landing/About';
import Contact from './components/landing/Contact';
function App() {
  return (
    <>
      <Routes>
        {/* landing page */}
        <Route path='/' element={<Home />} />
        <Route path='/job' element={<FindJob />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} /> 
      </Routes>
    </>
  )
}

export default App
