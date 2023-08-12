import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function turkishtoEnglish(input) {
  return input
    .replace('Ğ', 'g')
    .replace('Ü', 'u')
    .replace('Ş', 's')
    .replace('I', 'i')
    .replace('İ', 'i')
    .replace('Ö', 'o')
    .replace('Ç', 'c')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c');
}

function SongCollapse({ items, title, open }) {

  const [isOpen, setIsOpen] = useState(open);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="mt-1 flex w-full px-4 ">
      <div className="w-screen grid m-auto max-w-4xl flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="px-4 py-1 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 transition-all">
          <div onClick={toggleCollapse} className='col-span-full cursor-pointer flex items-center justify-between'>
            <h2 className="cursor-pointer p-4 text-xl font-bold leading-7 text-indigo-700">
              {title}
            </h2>
          </div>




          {items.map((item, key) => {
            console.log(item);
            if (isOpen) {
              return (
                <Link key={key} to={
                  `/akor/${turkishtoEnglish(item.artistInfo[0].artistName.split(" ").join("-").toLowerCase())}/${item.songName.toLowerCase().turkishtoEnglish()}/${item._id}`}>
                  <div className="group relative flex gap-x-6 rounded-lg p-4 items-center transition-all hover:bg-indigo-100">
                    <div className="flex overflow-hidden w-12 h-12 flex-none items-center justify-center rounded-lg">
                      <img
                        className="inline-block transition-all duration-500 group-hover:scale-125"
                        src={item.artistInfo[0].url}
                        alt=""
                      />
                    </div>
                    <div>
                      <p href={item.href} className="font-bold text-md text-gray-700">
                        {item.songName}
                        <span className="absolute inset-0" />
                      </p>
                      <p className=" text-gray-500">{item.artistInfo[0].artistName}</p>
                    </div>
                  </div>
                </Link>
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