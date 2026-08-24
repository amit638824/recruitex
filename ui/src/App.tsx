import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from 'react-router-dom'
import Home from './components/landing/Home';
import FindJob from './components/landing/FindJob';
import About from './components/landing/About';
import Contact from './components/landing/Contact';
import Register from './components/landing/Register';
import Login from './components/landing/Login';
function App() {
  return (
    <>
      <Routes>
        {/* landing page tm sb chor ho*/}
        <Route path='/' element={<Home />} />
        <Route path='/job' element={<FindJob />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
