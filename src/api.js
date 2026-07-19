const API_URL = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.detail || data?.message || 'Something went wrong')
  return data
}

export const api = {
  getTrips: () => request('/trips'),
  getTrip: (id) => request(`/trips/${id}`),
  createTrip: (trip) => request('/trips', { method: 'POST', body: JSON.stringify(trip) }),
  updateTrip: (id, trip) => request(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(trip) }),
  deleteTrip: (id) => request(`/trips/${id}`, { method: 'DELETE' }),
  generateItinerary: (id) => request(`/trips/${id}/generate`, { method: 'POST' }),
  getWeather: (city) => request(`/weather/${encodeURIComponent(city)}`),
  getPlaces: (city) => request(`/placeses/${encodeURIComponent(city)}`),
}
