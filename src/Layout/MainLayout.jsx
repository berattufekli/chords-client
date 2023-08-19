
import AdsComponent from 'Components/Ads/AdsComponent'
import Navbar from 'Components/Navbar/Navbar'
import React from 'react'

function MainLayout({ children }) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className='flex flex-col items-center'>
        <AdsComponent dataAdSlot={2653159122} />
        {children}
      </div>
    </div>
  )
}

export default MainLayout