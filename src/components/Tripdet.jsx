import { initialForm, dateText, moneyText, numericCost } from "../Datass";
import React from "react"
import { useState } from "react"
import { X, Users, Wallet, Sparkles, LoaderCircle } from "lucide-react";


export function TripDetails({ trip, onClose, onGenerate }) {
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