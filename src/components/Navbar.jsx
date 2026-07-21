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
      <div className={` flex items-center gap-5 rounded-full bg-[#d1c5f8] px-6 py-3 shadow-lg`}> 
        <Link className="rounded-full border-b-2 border-transparent px-4 py-1 text-lg tracking-[1px] transition-colors duration-300 hover:border-[#187DF4]" to="/">Home</Link>
        <Link className="rounded-full border-b-2 border-transparent px-4 py-1 text-lg tracking-[1px] transition-colors duration-300 hover:border-[#187DF4]" to="/mytrips">MyTrips</Link> 
      </div>
    </nav>
  )
}

export default Navbar
