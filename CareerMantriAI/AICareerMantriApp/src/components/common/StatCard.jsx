function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-helper">{helper}</p>
    </article>
  )
}

export default StatCard
