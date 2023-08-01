import React, { useState } from 'react'

function Tabs({activeTab, handleActiveTab}) {



  return (
    <div className='grid sm:grid-cols-6 grid-cols-3 gap-4'>
      <button onClick={() => handleActiveTab(0)} className={`${activeTab === 0 ? "border-b-indigo-700 text-indigo-700" : "border-b-transparent text-gray-600 hover:border-b-gray-400"} py-3 mx-1 text-lg font-bold transition-all border-b-2 `}>
        Profil
      </button>


      <button onClick={() => handleActiveTab(1)} className={`${activeTab === 1 ? "border-b-indigo-700 text-indigo-700" : "border-b-transparent text-gray-600 hover:border-b-gray-400"} py-3 mx-1 text-lg font-bold transition-all border-b-2 `}>
        Listeler
      </button>

      <button onClick={() => handleActiveTab(2)} className={`${activeTab === 2 ? "border-b-indigo-700 text-indigo-700" : "border-b-transparent text-gray-600 hover:border-b-gray-400"} py-3 mx-1 text-lg font-bold transition-all border-b-2 `}>
        Ayarlar
      </button>
    </div>
  )
}

export default Tabs