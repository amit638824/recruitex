import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaCheckCircle } from 'react-icons/fa'
import { userLogin } from '../../services/service'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice'
import { ToastContainer, toast } from 'react-toastify'

const loginSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().default(false),
})

type LoginFormValues = yup.InferType<typeof loginSchema>

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),

  })
  const onSubmit = async (data: any) => {
    const res = await userLogin(data)
    if (res?.success) {
      dispatch(login(res?.result));
      toast.success(res?.message || 'User login successfully')
      const usertype = res?.result?.type;
      if (usertype == 'admin') {
        navigate('/admin-dashboard')
      } else if (usertype == 'recruiter') {
        navigate('/recruiter-dashboard')
      } else if (usertype == 'seeker') {
        navigate('/seeker-dashboard')
      }
    } else {
      toast.error(res?.message || 'User login failed')
    }
  }

  return (
    <>
      <Navbar />
      <section className="rx-auth-wrap">
        <span className="rx-blob rx-blob-1"></span>
        <span className="rx-blob rx-blob-2"></span>
        <div className="container">
          <div className="rx-auth-card">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="rx-auth-aside">
                  <div className="rx-kicker">Login to your account</div>
                  <h2>Welcome Back!</h2>
                  <p>Login to your account and explore thousands of startup jobs around you.</p>
                  <div className="rx-illustration">
                    <div className="rx-illu-circle">
                      <div className="rx-illu-card">
                        <div className="rx-illu-avatar"><FaUser size={16} /></div>
                        <div className="rx-illu-line" style={{ width: '90%' }}></div>
                        <div className="rx-illu-line" style={{ width: '64%' }}></div>
                        <div className="d-flex align-items-center mt-2">
                          <FaCheckCircle color="#fb246a" size={12} />
                          <div className="rx-illu-line mb-0" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      <span className="rx-lock-badge"><FaLock size={16} /></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <form className="rx-auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="rx-field mb-3">
                    <label htmlFor="loginEmail">Email Address</label>
                    <div className="rx-input">
                      <span className="rx-input-icon"><FaEnvelope /></span>
                      <input
                        id="loginEmail"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        {...register('email')}
                      />
                    </div>
                    {errors.email && <span className="rx-error">{errors.email.message}</span>}
                  </div>

                  <div className="rx-field mb-3">
                    <label htmlFor="loginPassword">Password</label>
                    <div className="rx-input">
                      <span className="rx-input-icon"><FaLock /></span>
                      <input
                        id="loginPassword"
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control has-toggle ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        {...register('password')}
                      />
                      <button type="button" className="rx-eye" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <span className="rx-error">{errors.password.message}</span>}
                  </div>

                  <div className="rx-check-row mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" {...register('rememberMe')} />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className="rx-forgot">Forgot Password?</a>
                  </div>

                  <button type="submit" className="btn rx-submit">Login</button>
                  <div className="rx-or">OR</div>
                  <p className="rx-auth-foot mb-0">
                    Don&apos;t have an account? <Link to="/register">Register</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Login
