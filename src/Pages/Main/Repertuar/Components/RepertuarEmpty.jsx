import React from 'react'

function RepertuarEmpty() {
  return (
    <div className={`w-full grid m-auto max-w-4xl py-4 flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-md ring-1 ring-gray-900/5`}>
      <div className='px-8 font-bold text-gray-700 text-lg'>
        <p>Repertuar'da hiç şarkı bulunmamakta. </p>
        <p></p>
      </div>
    </div>
  )
}

export default RepertuarEmpty