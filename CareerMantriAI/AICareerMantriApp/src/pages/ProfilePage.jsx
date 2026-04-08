import { useEffect, useState } from 'react'
import PageHeader from '../components/common/PageHeader.jsx'
import { userApi } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

const defaultForm = {
  fullName: '',
  educationLevel: 'Undergraduate',
  interests: '',
  skills: '',
  preferredWorkStyle: 'Hybrid',
  careerGoal: '',
}

function ProfilePage() {
  const { user, updateUser } = useAuth()

  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await userApi.getProfile(user.id)
        setForm({
          fullName: profile.fullName,
          educationLevel: profile.educationLevel,
          interests: profile.interests,
          skills: profile.skills,
          preferredWorkStyle: profile.preferredWorkStyle,
          careerGoal: profile.careerGoal,
        })
      } catch (requestError) {
        setError(requestError.message)
      }
    }

    loadProfile()
  }, [user.id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const profile = await userApi.updateProfile(user.id, form)
      updateUser(profile)
      setMessage('Profile updated successfully.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <PageHeader
        title="Profile"
        subtitle="Keep your profile updated for better recommendations."
      />

      {message ? <p className="success-banner">{message}</p> : null}
      {error ? <p className="error-banner">{error}</p> : null}

      <form className="panel profile-form" onSubmit={handleSubmit}>
        <div className="grid-2">
          <label>
            Full name
            <input
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
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
        </div>

        <label>
          Interests
          <textarea
            name="interests"
            rows="3"
            value={form.interests}
            onChange={handleChange}
          />
        </label>

        <label>
          Skills
          <textarea
            name="skills"
            rows="3"
            value={form.skills}
            onChange={handleChange}
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
              value={form.careerGoal}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </section>
  )
}

export default ProfilePage
