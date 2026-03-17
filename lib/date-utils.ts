export function formatRelativeTime(dateInput: string | Date | undefined): string {
  if (!dateInput) return '';

  const now = new Date();
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return typeof dateInput === 'string' ? dateInput : '';

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  if (diffInDays === 1) {
    return 'Yesterday';
  }

  if (diffInDays < 7) {
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    if (isToday) return 'Today';

    return `${diffInDays} days ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
