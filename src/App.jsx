import { useEffect, useState } from 'react'
import {
  CalendarDays, CheckCircle2, LoaderCircle, MapPin, Menu, Plus,
  Sparkles, Trash2, Users, Wallet, X,
} from 'lucide-react'
import { api } from './api'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Popform from './components/Popform'
import Mytrips from './pages/Mytrips'
import { TripDetails } from './components/Tripdet'
import { Routes, Route} from 'react-router-dom'
import DotGrid from './components/Background'


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
      <div className="fixed inset-0 -z-10">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#cacfff"
          activeColor="#0a48f1"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

    <Navbar onPlan={() => setFormOpen(true)} />
    <Routes>
      <Route path="/" element={<Home onPlan={() => setFormOpen(true)} />} />
      <Route path="/mytrips" element={<Mytrips trips={trips} loading={loading} onOpen={setSelectedTrip} onDelete={remove} onPlan={() => setFormOpen(true)} />} />
    </Routes>
    <footer><div className="container"><div className="brand"><span><MapPin size={18} /></span> Trip All Out</div><p>Plan smarter. Travel better.</p></div></footer>
    <Popform  open={formOpen} onClose={() => setFormOpen(false)} onCreated={created} />
    <TripDetails trip={selectedTrip} onClose={() => setSelectedTrip(null)} onGenerate={generate} />
    {notice && <div className="toast"><CheckCircle2 /> {notice}</div>}

  </>
}

export default App
