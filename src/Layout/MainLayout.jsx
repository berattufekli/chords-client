import Navbar from 'Components/Navbar/Navbar'
import React from 'react'


function MainLayout({ children }) {
  return (
    <div className="bg-gray-100">
      <Navbar />
      {children}
    </div>
  )
}

export default MainLayout