export const UPLOAD_BASE = 'http://localhost:9000/uploads'

export const formatDate = (value: any) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const applicationStatusClass = (status?: string) => {
  const s = String(status || 'pending').toLowerCase()
  if (s === 'hired' || s === 'hire') return 'rac-badge rac-badge-hired'
  if (s === 'reject' || s === 'rejected') return 'rac-badge rac-badge-reject'
  return 'rac-badge rac-badge-pending'
}
