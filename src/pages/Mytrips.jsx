import React from 'react'
import {
  CalendarDays, CheckCircle2, LoaderCircle, MapPin, Menu, Plus,
  Sparkles, Trash2, Users, Wallet, X,
} from 'lucide-react'
import { dateText } from '../datas'

const Mytrips = ({ trips, loading, onOpen, onDelete, onPlan }) => {
  return (
    <>
    <section id="trips" className="trips-section">
    <div className="container">
        <div className="section-title">
            <div>
                {/* <span className="text-white text-[11px] tracking-[1.6px] font-extrabold">YOUR TRIPS</span> */}
                <h2>My Trips</h2>
                <p>View and manage your travel plans.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-95" onClick={onPlan}><Plus size={18} /> New Trip</button>
        </div>
      {loading ? <div className="state"><LoaderCircle className="spin" /> Loading trips...</div> : trips.length === 0 ? <div className="state empty"><MapPin /><h3>No trips yet</h3><p>Create your first AI-powered travel plan.</p>
      <button className="primary-button" onClick={onPlan}>Plan Your First Trip</button></div> : <div className="trip-grid">
        {trips.map((trip) => <article className="trip-card" key={trip.id}>
          <div className="trip-card-top"><div className="location-icon"><MapPin /></div><span className={trip.itinerary ? 'status ready' : 'status'}>{trip.itinerary ? 'Itinerary ready' : 'Not generated'}</span></div>
          <h3>{trip.destination}</h3><p className="route">From {trip.source}</p>
          <div className="trip-details"><span><CalendarDays /> {dateText(trip.start_date)}</span><span><Users /> {trip.travellers} traveller{trip.travellers > 1 ? 's' : ''}</span><span><Wallet /> ₹{Number(trip.budget).toLocaleString('en-IN')}</span></div>
          <div className="card-actions"><button className="view-button" onClick={() => onOpen(trip)}>View Trip</button><button className="delete-button" onClick={() => onDelete(trip.id)} aria-label="Delete trip"><Trash2 /></button></div>
        </article>)}
      </div>}
    </div>
  </section>
    </>
  )
}

export default Mytrips

