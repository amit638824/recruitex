import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaFileAlt } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { updateProfile } from '../../services/service'
import { login } from '../../redux/slices/authSlice'

const schema = yup.object({
  name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  contact: yup.string().matches(/^[0-9]{10}$/, 'Enter a 10-digit contact number').required('Contact number is required'),
  location: yup.string().trim().required('Location is required'),
  qualification: yup.string().trim().required('Qualification is required'),
  preference: yup.string().trim().required('Job preference is required'),
  password: yup.string().transform((v) => (v === '' ? undefined : v)).min(6, 'Password must be at least 6 characters').optional(),
})

const UpdateProfile = () => {
  const dispatch = useDispatch()
  const data: any = useSelector((state: any) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [preview, setPreview] = useState('')
  const [imgError, setImgError] = useState(false)
  const [imgFile, setImgFile] = useState<any>(null)
  const [resumeFile, setResumeFile] = useState<any>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } }: any = useForm<any>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    reset({
      name: data?.name || '',
      email: data?.email || '',
      contact: data?.contact || '',
      location: data?.location || '',
      qualification: data?.qualification || '',
      preference: data?.preference || '',
      password: '',
    })
  }, [data, reset])

  const onSubmit = async (form: any) => {
    try {
      const fd = new FormData()
      fd.append('id', data?.id)
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('contact', form.contact)
      fd.append('location', form.location)
      fd.append('qualification', form.qualification)
      fd.append('preference', form.preference)
      if (form.password) fd.append('password', form.password)
      if (imgFile) fd.append('img', imgFile)
      if (resumeFile) fd.append('resume', resumeFile)
      const res = await updateProfile(fd)
      if (res?.success) {
        dispatch(login({ ...data, ...res.result, token: data?.token }))
        toast.success(res.message || 'Profile updated successfully')
      } else {
        toast.error(res?.message || 'Profile update failed')
      }
    } catch {
      toast.error('Internal Server error')
    }
  }

  const avatarSrc = preview || (data?.img ? `http://localhost:9000/upload/${data.img}` : '')

  return (
    <Layout>
      <div className="dash-welcome">
        <h2>Update Profile</h2>
        <p>Keep your seeker profile ready for recruiters.</p>
      </div>
      <div className="dash-panel dash-profile">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="dash-profile-head">
            {avatarSrc && !imgError ? (
              <img src={avatarSrc} alt="" onError={() => setImgError(true)} />
            ) : (
              <span className="dash-user-icon"><FaUser /></span>
            )}
            <div>
              <h5>{data?.name || 'Seeker'}</h5>
              <small>Job Seeker</small>
              <label className="dash-file-btn">
                Change photo
                <input type="file" accept="image/*" hidden onChange={(e: any) => {
                  const file = e.target.files?.[0]
                  if (file) { setImgFile(file); setPreview(URL.createObjectURL(file)); setImgError(false) }
                }} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="rx-field">
                <label>Full Name</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaUser /></span>
                  <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name')} />
                </div>
                {errors.name && <span className="rx-error">{errors.name.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Email Address</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaEnvelope /></span>
                  <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email')} />
                </div>
                {errors.email && <span className="rx-error">{errors.email.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Contact Number</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaPhone /></span>
                  <input className={`form-control ${errors.contact ? 'is-invalid' : ''}`} {...register('contact')} />
                </div>
                {errors.contact && <span className="rx-error">{errors.contact.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Location</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaMapMarkerAlt /></span>
                  <input className={`form-control ${errors.location ? 'is-invalid' : ''}`} {...register('location')} />
                </div>
                {errors.location && <span className="rx-error">{errors.location.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Qualification</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaGraduationCap /></span>
                  <input className={`form-control ${errors.qualification ? 'is-invalid' : ''}`} {...register('qualification')} />
                </div>
                {errors.qualification && <span className="rx-error">{errors.qualification.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Job Preference</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaBriefcase /></span>
                  <input className={`form-control ${errors.preference ? 'is-invalid' : ''}`} placeholder="e.g. Frontend, Remote" {...register('preference')} />
                </div>
                {errors.preference && <span className="rx-error">{errors.preference.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Resume</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaFileAlt /></span>
                  <input type="file" accept=".pdf,.doc,.docx" className="form-control" onChange={(e: any) => setResumeFile(e.target.files?.[0] || null)} />
                </div>
                {(resumeFile?.name || data?.resume) && <span className="rx-error" style={{ color: '#8b95a7' }}>{resumeFile?.name || data?.resume}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>New Password</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaLock /></span>
                  <input type={showPassword ? 'text' : 'password'} className={`form-control has-toggle ${errors.password ? 'is-invalid' : ''}`} placeholder="Leave blank to keep current" {...register('password')} />
                  <button type="button" className="rx-eye" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="rx-error">{errors.password.message}</span>}
              </div>
            </div>
          </div>
          <button type="submit" className="btn rx-submit dash-profile-btn mt-3" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

export default UpdateProfile
