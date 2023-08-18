import { selectSongById } from 'Store/main/songsSlice';
import TurkishtoEnglish from 'lib/TurkishToEnglish';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'


function Header() {

  const { id } = useParams();



  const song = useSelector((state) => selectSongById(state, id))
  return (
    <div className='px-4 py-4'>
      <div className='flex items-center gap-2 font-bold text-gray-700 text-xl'>
        <img alt={song.artistInfo.artistName} src={song.artistInfo.url} className='w-20 h-20 rounded-md mr-2'>
        </img>
        <div className='flex sm:items-center flex-col sm:flex-row gap-0 sm:gap-2'>
          <Link to={
            `/artist/${TurkishtoEnglish(song.artistInfo.artistName.split(" ").join("-").toLowerCase())}/${song.artistInfo.artistId}`}>
            <p className='transition-all hover:underline underline-offset-4 inline-block text-xl'>
              {song.artistInfo.artistName}
            </p>
          </Link>
          <p className='hidden sm:flex'>-</p>
          <p className='text-xl'>{song.songName}</p>
        </div>
      </div>


    </div>
  )
}

export default Header