import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  educationLevel: 'Undergraduate',
  interests: '',
  skills: '',
  preferredWorkStyle: 'Hybrid',
  careerGoal: '',
}

function SignupPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authApi.signup(form)
      signIn(response)
      navigate('/home', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-card auth-card-wide">
        <p className="auth-eyebrow">Career Mantri</p>
        <h1>Create your profile</h1>
        <p className="auth-subtitle">
          Signup and get redirected to your dashboard automatically.
        </p>

        {error ? <p className="error-banner">{error}</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="grid-2">
            <label>
              Full name
              <input
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </label>

            <label>
              Education level
              <select
                name="educationLevel"
                value={form.educationLevel}
                onChange={handleChange}
              >
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Working Professional</option>
              </select>
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="name@email.com"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
              />
            </label>
          </div>

          <label>
            Interests
            <textarea
              name="interests"
              required
              rows="3"
              value={form.interests}
              onChange={handleChange}
              placeholder="AI, analytics, design, finance, psychology"
            />
          </label>

          <label>
            Skills
            <textarea
              name="skills"
              required
              rows="3"
              value={form.skills}
              onChange={handleChange}
              placeholder="Communication, SQL, Java, marketing"
            />
          </label>

          <div className="grid-2">
            <label>
              Preferred work style
              <select
                name="preferredWorkStyle"
                value={form.preferredWorkStyle}
                onChange={handleChange}
              >
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </label>

            <label>
              Career goal
              <input
                name="careerGoal"
                required
                value={form.careerGoal}
                onChange={handleChange}
                placeholder="Future role or impact"
              />
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default SignupPage
