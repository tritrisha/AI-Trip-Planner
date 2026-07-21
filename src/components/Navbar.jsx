// import React from 'react'
// import { useState } from 'react'
// import {
//   CalendarDays, CheckCircle2, LoaderCircle, MapPin, Menu, Plus,
//   Sparkles, Trash2, Users, Wallet, X,
// } from 'lucide-react'
// import { Link } from 'react-router-dom'

// const Navbar = (onPlan) => {
//      const [menuOpen, setMenuOpen] = useState(false)
//   return (
//     <>
//     <nav className='absolute top-6 left-1/2 z-50 mx-auto flex w-full -translate-x-1/2 flex-col items-center gap-2 rounded-[30px] bg-[#a1c2f5] p-2 text-base font-normal text-white sm:w-1/2 md:w-max md:flex-row md:gap-5 md:rounded-full md:p-1 md:pl-1.5'>
//         <div className="flex w-full justify-between gap-4 md:w-auto">
//       <button className="mr-3 md:hidden" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//         <span><MapPin size={20} /></span> AI Trip Planner
//       </button>
//       <nav className={menuOpen ? 'open' : ''}>
//         <Link to="/">Home</Link> |{" "}
//         <Link to="/mytrips">MyTrips</Link> |{" "}
//         <button onClick={() => { onPlan(); setMenuOpen(false) }}>Plan a Trip</button>
//       </nav>
//       <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
//         {menuOpen ? <X /> : <Menu />}
//       </button>
//     </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar

'use client'
import { MenuIcon, UserIcon, XIcon , MapPin} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'My Trips', link: '/mytrips' },
  ]
  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className={` flex items-center gap-5 rounded-full bg-[#94caff] px-6 py-3 shadow-lg`}> 
        <Link className="rounded-full border-b-2 border-transparent px-4 py-1 text-lg tracking-[1px] transition-colors duration-300 hover:border-[#187DF4]" to="/">Home</Link>
        <Link className="rounded-full border-b-2 border-transparent px-4 py-1 text-lg tracking-[1px] transition-colors duration-300 hover:border-[#187DF4]" to="/mytrips">MyTrips</Link> 
        <a
          href="https://github.com/tritrisha/AI-Trip-Planner"
          target="_blank"
          className="font-neuton flex items-center gap-1 rounded-full border-l-2 border-transparent bg-[#83a5f5] px-3 py-2.5 transition-all duration-300 hover:border-[#187DF4] active:scale-95"
        >
          <div className="rounded-full bg-white p-1">
            <UserIcon width={13} height={13} color="#000" />
          </div>
          <span className="text-center text-base text-blue-950">Github</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
// ${showNav ? 'flex' : 'hidden'}
