import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaBriefcase, FaLayerGroup, FaClock, FaUsers, FaMapMarkerAlt, FaRupeeSign, FaUserClock } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { recruiterJobPost } from '../../services/service'

const categories = [
  'Design & Creative',
  'Design & Development',
  'Sales & Marketing',
  'Mobile Application',
  'Construction',
  'Information Technology',
  'Real Estate',
  'Content Writer',
]

const schema = yup.object({
  job_title: yup.string().trim().min(2, 'Job title is required').required('Job title is required'),
  category: yup.string().required('Category is required'),
  job_type: yup.string().required('Job type is required'),
  experience: yup.string().required('Experience is required'),
  vacancies: yup.number().typeError('Enter vacancies').min(1, 'At least 1 vacancy').required('Vacancies is required'),
  job_location: yup.string().trim().required('Location is required'),
  salary: yup.string().trim().required('Salary is required'),
})

const PostJob = () => {
  const navigate = useNavigate()
  const data: any = useSelector((state: any) => state.auth)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } }: any = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { vacancies: 1 },
  })

  const onSubmit = async (form: any) => {
    try {
      const res = await recruiterJobPost(form, data?.token)
      if (res?.success) {
        toast.success(res.message || 'Job posted successfully')
        reset()
        setTimeout(() => navigate('/recruiter/postedjob'), 800)
      } else {
        toast.error(res?.message || 'Job post failed')
      }
    } catch {
      toast.error('Internal Server error')
    }
  }

  return (
    <Layout>
      <div className="dash-welcome">
        <h2>Post a Job</h2>
        <p>Add a new opening for seekers to apply.</p>
      </div>
      <div className="dash-panel dash-profile">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="rx-field">
                <label>Job Title</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaBriefcase /></span>
                  <input className={`form-control ${errors.job_title ? 'is-invalid' : ''}`} placeholder="e.g. Frontend Developer" {...register('job_title')} />
                </div>
                {errors.job_title && <span className="rx-error">{errors.job_title.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Category</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaLayerGroup /></span>
                  <select className={`form-control ${errors.category ? 'is-invalid' : ''}`} defaultValue="" {...register('category')}>
                    <option value="" disabled>Select category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                {errors.category && <span className="rx-error">{errors.category.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Job Type</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaClock /></span>
                  <select className={`form-control ${errors.job_type ? 'is-invalid' : ''}`} defaultValue="" {...register('job_type')}>
                    <option value="" disabled>Select job type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                {errors.job_type && <span className="rx-error">{errors.job_type.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Experience</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaUserClock /></span>
                  <select className={`form-control ${errors.experience ? 'is-invalid' : ''}`} defaultValue="" {...register('experience')}>
                    <option value="" disabled>Select experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 year">0-1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                {errors.experience && <span className="rx-error">{errors.experience.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Vacancies</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaUsers /></span>
                  <input type="number" min={1} className={`form-control ${errors.vacancies ? 'is-invalid' : ''}`} {...register('vacancies')} />
                </div>
                {errors.vacancies && <span className="rx-error">{errors.vacancies.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Job Location</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaMapMarkerAlt /></span>
                  <input className={`form-control ${errors.job_location ? 'is-invalid' : ''}`} placeholder="e.g. Bengaluru / Remote" {...register('job_location')} />
                </div>
                {errors.job_location && <span className="rx-error">{errors.job_location.message}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="rx-field">
                <label>Salary</label>
                <div className="rx-input">
                  <span className="rx-input-icon"><FaRupeeSign /></span>
                  <input className={`form-control ${errors.salary ? 'is-invalid' : ''}`} placeholder="e.g. 50000 - 80000" {...register('salary')} />
                </div>
                {errors.salary && <span className="rx-error">{errors.salary.message}</span>}
              </div>
            </div>
          </div>
          <button type="submit" className="btn rx-submit dash-profile-btn mt-3" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Layout>
  )
}

export default PostJob
