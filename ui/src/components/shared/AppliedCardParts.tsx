import type { ReactNode } from 'react'

export const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
}) => (
  <div className="rac-info-item">
    <span className="rac-info-icon">{icon}</span>
    <div>
      <span className="rac-info-label">{label}</span>
      <strong className="rac-info-value">{value}</strong>
    </div>
  </div>
)

export const JobChip = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
}) => (
  <div className="rac-job-chip">
    <span className="rac-job-chip-icon">{icon}</span>
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  </div>
)
