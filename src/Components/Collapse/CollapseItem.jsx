import React from 'react'
import { Link } from 'react-router-dom'


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

function CollapseItem({ item }) {
  return (
    <Link to={
      `/akor/${turkishtoEnglish(item.artistInfo.artistName.split(" ").join("-").toLowerCase())}/${turkishtoEnglish(item.songName.split(" ").join("-").toLowerCase())}/${item.songId}`}>
      <div className="group relative flex gap-x-6 rounded-lg p-4 items-center transition-all hover:bg-indigo-100">
        <div className="flex overflow-hidden flex-none items-center justify-center rounded-lg">
          <img
            className="inline-block transition-all duration-500 group-hover:scale-125 w-12 h-12"
            src={item.artistInfo.url}
            alt=""
          />
        </div>
        <div>
          <h1 href={item.href} className="font-bold text-md text-gray-700">
            {item.songName}
            <span className="absolute inset-0" />
          </h1>
          <p className=" text-gray-500">{item.artistInfo.artistName}</p>
        </div>
      </div>
    </Link>
  )
}

export default CollapseItem