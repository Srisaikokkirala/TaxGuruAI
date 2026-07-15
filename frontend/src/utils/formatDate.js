export function formatDateTime(dateValue) {
  if (!dateValue) return '';

  const date = new Date(dateValue);
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(date);
}

export function formatTime(dateValue) {
  if (!dateValue) return '';

  const date = new Date(dateValue);
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
