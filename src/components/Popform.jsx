import React from 'react'
import { useState, useEffect } from "react";
import { X, LoaderCircle, Sparkles } from "lucide-react";
import { api } from '../api';
import { initialForm, interests } from '../Datass';



const Popform = ({ open, onClose, onCreated }) => {
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
    if (open) { 
        setForm(initialForm); setError('') }
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

  return (
    <>
    <div className="modal-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
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
    </>
  )
}

export default Popform




  