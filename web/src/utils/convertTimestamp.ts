export function convertTimestamp(timestamp: string): string {
  // Convert ISO 8601 timestamp to Date object
  const date = new Date(timestamp)

  // Extract date and time components
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // Format the date and time
  const formattedDate = `${day}/${month}/${year} às ${hours}:${minutes}`

  return formattedDate
}
