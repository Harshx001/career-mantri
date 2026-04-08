function RecommendationCard({ item }) {
  return (
    <article className="panel recommendation-card">
      <div className="recommendation-head">
        <div>
          <h3>{item.careerPath}</h3>
          <p>{item.reason}</p>
        </div>
        <span className="score-chip">{item.matchScore}% match</span>
      </div>

      <div className="tag-list">
        {(item.strengthAreas ?? []).map((strength) => (
          <span key={strength} className="soft-tag">
            {strength}
          </span>
        ))}
      </div>

      <p className="next-step">
        <strong>Next step:</strong> {item.nextStep}
      </p>
    </article>
  )
}

export default RecommendationCard
