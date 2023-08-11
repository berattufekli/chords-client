import { selectLists } from 'Store/main/listsSlice'
import React from 'react'
import { useSelector } from 'react-redux'

function Header() {

  const lists = useSelector(selectLists);

  return (
    <div className={`w-screen grid m-auto max-w-4xl flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg mb-4`}>
      <div className='px-4 py-1'>
        <h2 className="pointer-events-none p-4 text-xl font-bold leading-7 text-gray-700">
          {lists[0].listName}
        </h2>
      </div>
    </div>
  )
}

export default Header