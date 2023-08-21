import Navbar from 'Components/Navbar/Navbar'
import React from 'react'

function MainLayout({ children }) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className='flex flex-col items-center'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout