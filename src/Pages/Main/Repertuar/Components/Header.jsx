import { selectLists } from 'Store/main/listsSlice'
import React from 'react'
import { useSelector } from 'react-redux'

function Header() {

  const lists = useSelector(selectLists);

  return (
    <div className={`w-full grid m-auto max-w-4xl flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-md mb-4 ring-1 ring-gray-900/5`}>
      <div className='px-2 sm:px-4 py-1'>
        <h2 className="pointer-events-none p-4 text-xl font-bold leading-7 text-indigo-700">
          {lists[0].listName}
        </h2>
      </div>
    </div>
  )
}

export default Header