import React from 'react'
import { MapPin, Sparkles} from 'lucide-react'
import TextType from '../components/TextType'
import DotGrid from '../components/Background'

const Home = (props) => {
  return (
    <>
    {/* <section id="home" className="hero" container hero-content> */}

        <div className="min-h-screen flex flex-col items-center justify-center text-center border-b border-[#9ac6f1] px-6">
            <div className="hero-icon"><MapPin /></div>
            <span className="text-white">SMART TRAVEL PLANNING</span>
            <TextType className="font-['Outfit'] text-5xl font-bold leading-tight tracking-tight text-amber-100 md:text-6xl"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                text={["Plan a perfect Itinerary", "and have a Great Holiday", "Happy Vacation!"]}
                deletingSpeed={50}
                variableSpeedEnabled={false}
                variableSpeedMin={60}
                variableSpeedMax={120}
                cursorBlinkDuration={0.5}
                />
            <p className="m-6 text-white font-extrabold ">Create a personalized itinerary based on your destination, budget, interests, and travel style.</p>   
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-95" onClick={props.onPlan}><Sparkles size={18} /> Plan a Trip</button>
            
        </div>
    </>
  )
}

export default Home



