import React from 'react'
import Play from '../components/Therapy-AV/Play'
import Audio from '../components/Therapy-AV/Audio'
import MentalWellnessChatbot from '../Final/MentalWellnessChatbot' // ✅ Import chatbot

function TherapyPage() {
  return (
    <div>
      <Play />
      <Audio />
      
      {/* ✅ Chatbot will float in bottom-right */}
      <MentalWellnessChatbot />
    </div>
  )
}

export default TherapyPage
