import React, { useState } from 'react'
import CollapseItem from './CollapseItem';



function SongCollapse({ items, title, open }) {

  const [isOpen, setIsOpen] = useState(open);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="mt-1 flex w-full px-2">
      <div className="w-screen grid m-auto max-w-4xl flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-sm ring-1 ring-gray-900/5">
        <div className="px-2 sm:px-4 py-0 sm:py-1 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 transition-all">
          <div onClick={toggleCollapse} className='col-span-full cursor-pointer flex items-center justify-between'>
            <h2 className="cursor-pointer p-2 sm:p-3 text-lg sm:text-xl font-bold leading-7 text-indigo-700">
              {title}
            </h2>
          </div>




          {items.map((item, key) => {
            console.log(item);
            if (isOpen) {
              return (
                <CollapseItem  key={key} item={item} />
              )
            }

            return null;
          })}

          <div className={isOpen === true ? "pb-3" : "pb-0"}></div>
        </div>
      </div>
    </div>
  )
}

export default SongCollapse