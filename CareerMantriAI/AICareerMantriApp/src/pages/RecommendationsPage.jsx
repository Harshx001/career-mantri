import { useEffect, useState } from 'react'
import PageHeader from '../components/common/PageHeader.jsx'
import RecommendationCard from '../components/recommendations/RecommendationCard.jsx'
import { recommendationApi } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function RecommendationsPage() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    fullName: user.fullName,
    educationLevel: user.educationLevel,
    interests: user.interests,
    skills: user.skills,
    preferredWorkStyle: user.preferredWorkStyle,
    careerGoal: user.careerGoal,
  })
  const [summary, setSummary] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUserRecommendations = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await recommendationApi.getForUser(user.id)
        setSummary(data.profileSummary)
        setRecommendations(data.recommendations)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadUserRecommendations()
  }, [user.id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleGenerate = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await recommendationApi.generate(form)
      setSummary(data.profileSummary)
      setRecommendations(data.recommendations)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <PageHeader
        title="AI Recommendations"
        subtitle="Generate updated career suggestions from your current details."
      />

      {summary ? <p className="panel">{summary}</p> : null}
      {error ? <p className="error-banner">{error}</p> : null}

      <form className="panel profile-form" onSubmit={handleGenerate}>
        <div className="grid-2">
          <label>
            Full name
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
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
            value={form.interests}
            rows="3"
            onChange={handleChange}
          />
        </label>

        <label>
          Skills
          <textarea
            name="skills"
            value={form.skills}
            rows="3"
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
          {loading ? 'Generating...' : 'Regenerate recommendations'}
        </button>
      </form>

      <div className="content-stack">
        {recommendations.map((item) => (
          <RecommendationCard key={item.careerPath} item={item} />
        ))}
      </div>
    </section>
  )
}

export default RecommendationsPage
