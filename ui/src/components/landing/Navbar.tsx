import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header>
      <div className="header-area header-transparrent">
        <div className="headder-top header-sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-2 col-6">
                <div className="logo">
                  <Link to="/" onClick={closeMenu}>
                    <img src="/assets/img/logo/logo.png" alt="job finder" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-10 col-6">
                <div className="menu-wrapper">
                  <div className="main-menu">
                    <nav className={open ? 'mobile-open' : 'd-none d-lg-block'}>
                      <ul id="navigation">
                        <li>
                          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
                        </li>
                        <li>
                          <NavLink to="/job" onClick={closeMenu}>Find a Jobs </NavLink>
                        </li>
                        <li>
                          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                        </li>
                         
                        <li>
                          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className={`header-btn f-right ${open ? 'mobile-open' : 'd-none d-lg-block'}`}>
                    <Link to="/register" className="btn head-btn1" onClick={closeMenu}>Register</Link>
                    <Link to="/login" className="btn head-btn2" onClick={closeMenu}>Login</Link>
                  </div>
                  <button type="button" className="mobile-menu-btn d-lg-none" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                    {open ? <FaTimes /> : <FaBars />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
