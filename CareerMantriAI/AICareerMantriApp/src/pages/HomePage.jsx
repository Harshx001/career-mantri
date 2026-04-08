import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader.jsx'
import StatCard from '../components/common/StatCard.jsx'
import { courseApi, healthApi, recommendationApi } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function HomePage() {
  const { user } = useAuth()

  const [stats, setStats] = useState({
    courses: 0,
    recommendations: 0,
    backendStatus: 'Checking...',
  })

  useEffect(() => {
    const loadHomeStats = async () => {
      try {
        const [courseList, recommendationData, health] = await Promise.all([
          courseApi.list(),
          recommendationApi.getForUser(user.id),
          healthApi.get(),
        ])

        setStats({
          courses: courseList.length,
          recommendations: recommendationData.recommendations.length,
          backendStatus: health.message,
        })
      } catch {
        setStats((current) => ({
          ...current,
          backendStatus: 'Backend unavailable',
        }))
      }
    }

    loadHomeStats()
  }, [user.id])

  return (
    <section>
      <PageHeader
        title="Dashboard Home"
        subtitle="Your personalized career command center."
      />

      <div className="stat-grid">
        <StatCard
          label="Profile"
          value={user.educationLevel}
          helper={`Work style: ${user.preferredWorkStyle}`}
        />
        <StatCard
          label="Courses Available"
          value={stats.courses}
          helper="Role-aligned learning paths"
        />
        <StatCard
          label="Top Recommendations"
          value={stats.recommendations}
          helper="Generated from your profile"
        />
      </div>

      <article className="panel">
        <h3>Backend health</h3>
        <p>{stats.backendStatus}</p>
      </article>

      <article className="panel">
        <h3>Quick actions</h3>
        <div className="quick-link-list">
          <Link to="/profile" className="quick-link">
            Update profile
          </Link>
          <Link to="/courses" className="quick-link">
            Explore courses
          </Link>
          <Link to="/recommendations" className="quick-link">
            View recommendations
          </Link>
        </div>
      </article>
    </section>
  )
}

export default HomePage
