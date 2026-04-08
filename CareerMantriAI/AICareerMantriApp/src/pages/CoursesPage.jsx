import { useEffect, useState } from 'react'
import CourseCard from '../components/courses/CourseCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { courseApi } from '../services/api.js'

const courseTags = ['All', 'Technology', 'Data', 'Design', 'Marketing', 'Counseling']

function CoursesPage() {
  const [selectedTag, setSelectedTag] = useState('All')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await courseApi.list(selectedTag === 'All' ? '' : selectedTag)
        setCourses(data)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [selectedTag])

  return (
    <section>
      <PageHeader
        title="Courses"
        subtitle="Role-aligned learning tracks to improve your profile."
      />

      <div className="tag-list">
        {courseTags.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`soft-tag ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {error ? <p className="error-banner">{error}</p> : null}
      {loading ? <p className="panel">Loading courses...</p> : null}

      {!loading && courses.length === 0 ? (
        <p className="panel">No courses found for this tag.</p>
      ) : null}

      <div className="content-stack">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default CoursesPage
