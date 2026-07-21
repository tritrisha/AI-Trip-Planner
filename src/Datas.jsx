
export const initialForm = {
  source: '', destination: '', start_date: '', end_date: '', budget: '',
  travellers: 1, travel_style: 'Balanced', interests: [],
}

export const interests = ['Nature', 'Food', 'Culture', 'Adventure']

export const dateText = (date) => date
  ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date))
  : '—'

export const moneyText = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Not estimated'}
  if (typeof value === 'number') {
    return `₹${value.toLocaleString('en-IN')}`}
  const text = String(value)
  if (/^[\d,.]+$/.test(text.trim())) {
    return `₹${Number(text.replaceAll(',', '')).toLocaleString('en-IN')}`}
    return text.replaceAll('â¹', '₹')
}

export const numericCost = (value) => {
  if (typeof value === 'number') {
    return value}
  const match = String(value || '').replaceAll(',', '').match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}


