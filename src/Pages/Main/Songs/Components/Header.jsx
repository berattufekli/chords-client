import { selectSongById } from 'Store/main/songsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

function Header() {

  const { id } = useParams();

  const song = useSelector((state) => selectSongById(state, id))
  return (
    <div className='px-4 py-4'>
      <div className='flex items-center gap-2 font-bold text-gray-700 text-xl'>
        <img src={song.artistInfo[0].url} className='w-20 h-20 rounded-md mr-2'>
        </img>
        <Link to={
          `/artist/${song.artistInfo[0].artistName.split(" ").join("-").toLowerCase().turkishtoEnglish()}/${song.artistInfo[0]._id}`}>
          <p className='transition-all hover:underline underline-offset-4 inline-block '>
            {song.artistInfo[0].artistName}
          </p>
        </Link>
        <p>-</p>
        <p>{song.songName}</p>
      </div>


    </div>
  )
}

export default Header