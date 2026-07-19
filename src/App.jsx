import { useEffect, useState } from 'react'
import {
  CalendarDays, CheckCircle2, LoaderCircle, MapPin, Menu, Plus,
  Sparkles, Trash2, Users, Wallet, X,
} from 'lucide-react'
import { api } from './api'

const interests = ['Nature', 'Food', 'Culture', 'Adventure']
const initialForm = {
  source: '', destination: '', start_date: '', end_date: '', budget: '',
  travellers: 1, travel_style: 'Balanced', interests: [],
}

const dateText = (date) => date
  ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date))
  : '—'

const moneyText = (value) => {
  if (value === null || value === undefined || value === '') return 'Not estimated'
  if (typeof value === 'number') return `₹${value.toLocaleString('en-IN')}`
  const text = String(value)
  if (/^[\d,.]+$/.test(text.trim())) return `₹${Number(text.replaceAll(',', '')).toLocaleString('en-IN')}`
  return text.replaceAll('â¹', '₹')
}

const numericCost = (value) => {
  if (typeof value === 'number') return value
  const match = String(value || '').replaceAll(',', '').match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

function Header({ onPlan }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className="header">
    <div className="container nav">
      <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span><MapPin size={20} /></span> AI Trip Planner
      </button>
      <nav className={menuOpen ? 'open' : ''}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#trips" onClick={() => setMenuOpen(false)}>My Trips</a>
        <button onClick={() => { onPlan(); setMenuOpen(false) }}>Plan a Trip</button>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
    </div>
  </header>
}

function Hero({ onPlan }) {
  return <section id="home" className="hero">
    <div className="container hero-content">
      <div className="hero-icon"><MapPin /></div>
      <span className="label">SMART TRAVEL PLANNING</span>
      <h1>Plan your perfect trip<br />with AI</h1>
      <p>Create a personalized itinerary based on your destination, budget, interests, and travel style.</p>
      <button className="primary-button" onClick={onPlan}><Sparkles size={18} /> Plan a Trip</button>
    </div>
  </section>
}

function TripForm({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) { setForm(initialForm); setError('') }
  }, [open])

  if (!open) return null
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const toggleInterest = (item) => update(
    'interests',
    form.interests.includes(item) ? form.interests.filter((value) => value !== item) : [...form.interests, item],
  )

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await api.createTrip({
        ...form,
        budget: Number(form.budget),
        travellers: Number(form.travellers),
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
      })
      await onCreated(result.trip_id)
      onClose()
    } catch (err) {
      setError(`${err.message}. Please check that the backend is running.`)
    } finally {
      setLoading(false)
    }
  }

  return <div className="modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header"><div><h2>Plan a new trip</h2><p>Enter your travel details below.</p></div><button onClick={onClose}><X /></button></div>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>Starting city<input required value={form.source} onChange={(e) => update('source', e.target.value)} placeholder="e.g. Delhi" /></label>
          <label>Destination<input required value={form.destination} onChange={(e) => update('destination', e.target.value)} placeholder="e.g. Goa" /></label>
          <label>Start date<input required type="date" value={form.start_date} onChange={(e) => update('start_date', e.target.value)} /></label>
          <label>End date<input required type="date" min={form.start_date} value={form.end_date} onChange={(e) => update('end_date', e.target.value)} /></label>
          <label>Budget<input required min="1" type="number" value={form.budget} onChange={(e) => update('budget', e.target.value)} placeholder="e.g. 50000" /></label>
          <label>Travellers<input required min="1" type="number" value={form.travellers} onChange={(e) => update('travellers', e.target.value)} /></label>
          <label className="full">Travel style<select value={form.travel_style} onChange={(e) => update('travel_style', e.target.value)}><option>Relaxed</option><option>Balanced</option><option>Packed</option></select></label>
          <fieldset className="full"><legend>Interests</legend><div className="interest-list">{interests.map((item) => <button type="button" className={form.interests.includes(item) ? 'active' : ''} key={item} onClick={() => toggleInterest(item)}>{item}</button>)}</div></fieldset>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={loading}>{loading ? <LoaderCircle className="spin" /> : <Sparkles size={17} />} Create Trip</button></div>
      </form>
    </div>
  </div>
}

function Trips({ trips, loading, onOpen, onDelete, onPlan }) {
  return <section id="trips" className="trips-section">
    <div className="container">
      <div className="section-title"><div><span className="label">YOUR TRIPS</span><h2>My Trips</h2><p>View and manage your travel plans.</p></div><button className="primary-button" onClick={onPlan}><Plus size={18} /> New Trip</button></div>
      {loading ? <div className="state"><LoaderCircle className="spin" /> Loading trips...</div> : trips.length === 0 ? <div className="state empty"><MapPin /><h3>No trips yet</h3><p>Create your first AI-powered travel plan.</p><button className="primary-button" onClick={onPlan}>Plan Your First Trip</button></div> : <div className="trip-grid">
        {trips.map((trip) => <article className="trip-card" key={trip.id}>
          <div className="trip-card-top"><div className="location-icon"><MapPin /></div><span className={trip.itinerary ? 'status ready' : 'status'}>{trip.itinerary ? 'Itinerary ready' : 'Not generated'}</span></div>
          <h3>{trip.destination}</h3><p className="route">From {trip.source}</p>
          <div className="trip-details"><span><CalendarDays /> {dateText(trip.start_date)}</span><span><Users /> {trip.travellers} traveller{trip.travellers > 1 ? 's' : ''}</span><span><Wallet /> ₹{Number(trip.budget).toLocaleString('en-IN')}</span></div>
          <div className="card-actions"><button className="view-button" onClick={() => onOpen(trip)}>View Trip</button><button className="delete-button" onClick={() => onDelete(trip.id)} aria-label="Delete trip"><Trash2 /></button></div>
        </article>)}
      </div>}
    </div>
  </section>
}

function TripDetails({ trip, onClose, onGenerate }) {
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  if (!trip) return null
  const itinerary = trip.itinerary
  const days = Array.isArray(itinerary) ? itinerary : itinerary?.days || itinerary?.itinerary || []
  const dayTotal = days.reduce((total, day) => total + numericCost(day.estimated_cost), 0)
  const estimatedTotal = numericCost(itinerary?.total_estimated_cost) || dayTotal
  const remaining = Number(trip.budget) - estimatedTotal
  const generate = async () => {
    setGenerating(true); setError('')
    try { await onGenerate(trip.id) } catch (err) { setError(err.message) } finally { setGenerating(false) }
  }
  return <div className="modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="modal details-modal">
      <div className="modal-header"><div><span className="label">TRIP DETAILS</span><h2>{trip.destination}</h2><p>From {trip.source} · {dateText(trip.start_date)} to {dateText(trip.end_date)}</p></div><button onClick={onClose}><X /></button></div>
      <div className="quick-details"><div><Users /><span>Travellers</span><b>{trip.travellers}</b></div><div><Wallet /><span>Budget</span><b>₹{Number(trip.budget).toLocaleString('en-IN')}</b></div><div><Sparkles /><span>Travel style</span><b>{trip.travel_style}</b></div></div>
      <div className="itinerary-header"><div><h3>AI Itinerary</h3>{itinerary && <p>Generate again to replace the current plan.</p>}</div><button className="primary-button" onClick={generate} disabled={generating}>{generating ? <LoaderCircle className="spin" /> : <Sparkles size={17} />} {generating ? 'Generating...' : itinerary ? 'Regenerate Itinerary' : 'Generate Itinerary'}</button></div>
      {error && <div className="error-message">{error}</div>}
      {!itinerary ? <div className="state empty small"><Sparkles /><h3>No itinerary generated</h3><p>Generate a personalized day-by-day plan for this trip.</p></div> : itinerary.warning ? <div className="budget-warning"><Wallet /><div><h3>Budget needs attention</h3><p>{itinerary.warning}</p>{itinerary.suggested_budget && <div className="suggested-costs">{Object.entries(itinerary.suggested_budget).map(([name, cost]) => <span key={name}><small>{name.replaceAll('_', ' ')}</small><b>{moneyText(cost)}</b></span>)}</div>}</div></div> : days.length > 0 ? <>
        <div className="cost-summary">
          <div><span>Trip budget</span><b>{moneyText(Number(trip.budget))}</b></div>
          <div><span>Estimated cost</span><b>{moneyText(estimatedTotal)}</b></div>
          <div className={remaining < 0 ? 'over' : 'remaining'}><span>{remaining < 0 ? 'Over budget' : 'Remaining'}</span><b>{moneyText(Math.abs(remaining))}</b></div>
        </div>
        <div className="days">{days.map((day, index) => <article key={index}>
          <div className="day-heading"><div><span>Day {day.day || index + 1}</span><h4>{day.title || day.theme || `Explore ${trip.destination}`}</h4></div><strong>{moneyText(day.estimated_cost)}</strong></div>
          <div className="day-section"><h5>Activities</h5>{(day.activities || day.plan || []).map((activity, activityIndex) => <p key={activityIndex}>{typeof activity === 'string' ? activity : <><b>{activity.time}</b> {activity.activity || activity.name || activity.description}</>}</p>)}</div>
          {day.meals?.length > 0 && <div className="day-section meals"><h5>Meals</h5>{day.meals.map((meal, mealIndex) => <p key={mealIndex}>{typeof meal === 'string' ? meal : meal.name || meal.description}</p>)}</div>}
        </article>)}</div>
        <div className="total-cost"><div><Wallet /><span>Total estimated trip cost</span></div><strong>{moneyText(estimatedTotal)}</strong></div>
      </> : <pre className="raw-itinerary">{JSON.stringify(itinerary, null, 2)}</pre>}
    </div>
  </div>
}

function App() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [notice, setNotice] = useState('')

  const loadTrips = async () => {
    setLoading(true)
    try { setTrips(await api.getTrips()) } catch { setTrips([]) } finally { setLoading(false) }
  }
  useEffect(() => { loadTrips() }, [])

  const created = async (id) => {
    await loadTrips()
    setSelectedTrip(await api.getTrip(id))
    setNotice('Trip created successfully')
    setTimeout(() => setNotice(''), 3000)
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this trip?')) return
    await api.deleteTrip(id)
    setTrips((current) => current.filter((trip) => trip.id !== id))
  }
  const generate = async (id) => {
    const response = await api.generateItinerary(id)
    const updated = { ...selectedTrip, itinerary: response.itinerary }
    setSelectedTrip(updated)
    setTrips((current) => current.map((trip) => trip.id === id ? updated : trip))
  }

  return <>
    <Header onPlan={() => setFormOpen(true)} />
    <main><Hero onPlan={() => setFormOpen(true)} /><Trips trips={trips} loading={loading} onOpen={setSelectedTrip} onDelete={remove} onPlan={() => setFormOpen(true)} /></main>
    <footer><div className="container"><div className="brand"><span><MapPin size={18} /></span> AI Trip Planner</div><p>Plan smarter. Travel better.</p></div></footer>
    <TripForm open={formOpen} onClose={() => setFormOpen(false)} onCreated={created} />
    <TripDetails trip={selectedTrip} onClose={() => setSelectedTrip(null)} onGenerate={generate} />
    {notice && <div className="toast"><CheckCircle2 /> {notice}</div>}
  </>
}

export default App
