import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Navbar'
import Footer from './Footer'
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCheckCircle,
} from 'react-icons/fa'

const registerSchema = yup.object({
  type: yup
    .string()
    .oneOf(['recruiter', 'seeker'], 'Select recruiter or seeker')
    .required('User type is required'),
  name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  contact: yup.string().matches(/^[0-9]{10}$/, 'Enter a 10-digit contact number').required('Contact number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  location: yup.string().trim().required('Location is required'),
  qualification: yup.string().trim().required('Qualification is required'),
})

type RegisterFormValues = yup.InferType<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      type: undefined,
      name: '',
      email: '',
      contact: '',
      password: '',
      confirmPassword: '',
      location: '',
      qualification: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword: _confirmPassword, ...payload } = data
      const res = await axios.post('http://localhost:9000/api/register', payload)
      if (res.data?.success) {
        toast.success(res.data.message || 'User register successfully')
        reset()
        setTimeout(() => navigate('/login'), 1200)
      } else {
        toast.error(res.data?.message || 'Registration failed')
      }
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Internal Server error'
      toast.error(message)
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
              <div className="col-lg-4">
                <div className="rx-auth-aside">
                  <div className="rx-kicker">Create Account</div>
                  <h2>Create your account</h2>
                  <p>Join RecruiteX today and take the next step toward finding your dream job.</p>
                  <div className="rx-illustration">
                    <div className="rx-illu-circle">
                      <div className="rx-illu-card">
                        <div className="rx-illu-avatar"><FaUser size={16} /></div>
                        <div className="rx-illu-line" style={{ width: '88%' }}></div>
                        <div className="rx-illu-line" style={{ width: '70%' }}></div>
                        <div className="rx-illu-line" style={{ width: '78%' }}></div>
                      </div>
                      <FaCheckCircle className="rx-check" style={{ top: 38, right: 28 }} size={22} />
                      <FaCheckCircle className="rx-check" style={{ top: 86, left: 22 }} size={20} />
                      <FaCheckCircle className="rx-check" style={{ bottom: 36, right: 42 }} size={18} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <form className="rx-auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="userType">User Type</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaBriefcase /></span>
                          <select
                            id="userType"
                            className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                            defaultValue=""
                            {...register('type')}
                          >
                            <option value="" disabled>Select user type</option>
                            <option value="seeker">Seeker</option>
                            <option value="recruiter">Recruiter</option>
                          </select>
                        </div>
                        {errors.type && <span className="rx-error">{errors.type.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaUser /></span>
                          <input
                            id="fullName"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder="Enter your full name"
                            {...register('name')}
                          />
                        </div>
                        {errors.name && <span className="rx-error">{errors.name.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="email">Email Address</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaEnvelope /></span>
                          <input
                            id="email"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter your email"
                            {...register('email')}
                          />
                        </div>
                        {errors.email && <span className="rx-error">{errors.email.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="contact">Contact Number</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaPhone /></span>
                          <input
                            id="contact"
                            type="tel"
                            className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                            placeholder="Enter your contact number"
                            {...register('contact')}
                          />
                        </div>
                        {errors.contact && <span className="rx-error">{errors.contact.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="password">Password</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaLock /></span>
                          <input
                            id="password"
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
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaLock /></span>
                          <input
                            id="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            className={`form-control has-toggle ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            placeholder="Confirm your password"
                            {...register('confirmPassword')}
                          />
                          <button type="button" className="rx-eye" onClick={() => setShowConfirm((v) => !v)} aria-label="Toggle confirm password">
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {errors.confirmPassword && <span className="rx-error">{errors.confirmPassword.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="location">Location</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaMapMarkerAlt /></span>
                          <input
                            id="location"
                            type="text"
                            className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                            placeholder="Enter your location"
                            {...register('location')}
                          />
                        </div>
                        {errors.location && <span className="rx-error">{errors.location.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="rx-field">
                        <label htmlFor="qualification">Qualification</label>
                        <div className="rx-input">
                          <span className="rx-input-icon"><FaGraduationCap /></span>
                          <input
                            id="qualification"
                            type="text"
                            className={`form-control ${errors.qualification ? 'is-invalid' : ''}`}
                            placeholder="Enter your qualification"
                            {...register('qualification')}
                          />
                        </div>
                        {errors.qualification && <span className="rx-error">{errors.qualification.message}</span>}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn rx-submit mt-4" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Account'}
                  </button>
                  <p className="rx-auth-foot mb-0">
                    Already have an account? <Link to="/login">Login</Link>
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

export default Register
