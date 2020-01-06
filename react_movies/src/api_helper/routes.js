const serverUrl = 'http://127.0.0.1:8000'

export const movieByTitleYearApiUrl = (title, year) => {
  if (title !== '' && year !== '') {
    return `${serverUrl}/api/v1/movies/?title=${title}&year=${year}`
  }
  if (year === '') {
    return `${serverUrl}/api/v1/movies/?title=${title}`
  }
}