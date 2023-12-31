import { selectLists } from 'Store/main/listsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RepertuarEmpty from './RepertuarEmpty';
import { selectSongs } from 'Store/main/songsSlice';
import TurkishtoEnglish from 'lib/TurkishToEnglish';


function RepertuarList() {
  const list = useSelector(selectLists);
  const songs = useSelector(selectSongs);
  console.log("bak", list);


  console.log(list);

  if (list[0].songsData.length === 0) {
    return <RepertuarEmpty />
  }

  return (
    <div className={`w-full grid m-auto max-w-4xl py-4 flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-md ring-1 ring-gray-900/5`}>
      <div className='px-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 transition-all'>
        {list[0].songsData.map((item, key) => {
          const songInfo = songs.find((f) => f.songId === item.songId);
          const { artistInfo } = songInfo

          return (
            <Link key={key} to={
              `/akor/${TurkishtoEnglish(artistInfo.artistName.split(" ").join("-").toLowerCase())}/${TurkishtoEnglish(songInfo.songName.toLowerCase())}/${songInfo.songId}`}>
              <div className="group relative flex gap-x-6 rounded-lg p-4 items-center transition-all hover:bg-indigo-100">
                <div className="flex overflow-hidden w-12 h-12 flex-none items-center justify-center rounded-lg">
                  <img
                    className="inline-block transition-all duration-500 group-hover:scale-125"
                    src={artistInfo.url}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold text-md text-gray-700">
                    {songInfo.songName}
                    <span className="absolute inset-0" />
                  </p>
                  <p className=" text-gray-500">{artistInfo.artistName}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default RepertuarList