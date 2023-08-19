import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactGA from "react-ga";

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
  const navigate = useNavigate();

  const handleClick = () => {
    ReactGA.event({
      category: item.songName,
      action: "Click",
      label: "Şarkıya Girdi",
      value: item.songId,
    })
    navigate(`/akor/${turkishtoEnglish(item.artistInfo.artistName.split(" ").join("-").toLowerCase())}/${turkishtoEnglish(item.songName.split(" ").join("-").toLowerCase())}/${item.songId}`);
  }

  return (
    <div onClick={handleClick} className="group relative flex gap-x-6 rounded-lg p-4 items-center transition-all hover:bg-indigo-100">
      <div className="flex overflow-hidden w-12 h-12 flex-none items-center justify-center rounded-lg">
        <img
          className="inline-block transition-all duration-500 group-hover:scale-125"
          src={item.artistInfo.url}
          alt=""
        />
      </div>
      <div>
        <p href={item.href} className="font-bold text-md text-gray-700">
          {item.songName}
          <span className="absolute inset-0" />
        </p>
        <p className=" text-gray-500">{item.artistInfo.artistName}</p>
      </div>
    </div>
  )
}

export default CollapseItem