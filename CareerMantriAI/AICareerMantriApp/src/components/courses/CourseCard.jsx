function CourseCard({ course }) {
  return (
    <article className="panel course-card">
      <div className="course-head">
        <h3>{course.title}</h3>
        <span className="course-tag">{course.tag}</span>
      </div>

      <p>{course.description}</p>
      <p className="course-meta">
        Level: <strong>{course.level}</strong> | Duration: <strong>{course.durationWeeks} weeks</strong>
      </p>
    </article>
  )
}

export default CourseCard
