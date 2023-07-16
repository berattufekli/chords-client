import { selectSongById } from 'Store/main/songsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

function Header() {

  const { id } = useParams();

  const song = useSelector((state) => selectSongById(state, id))
  return (
    <div className='px-4 py-4'>
      <div className='flex font-bold text-gray-700 text-xl'>
        <Link to={
          `/artist/${song.artistInfo.artistName.split(" ").join("-").toLowerCase().turkishtoEnglish()}/${song.artistInfo.artistId}`}>
          <p className='transition-all hover:underline underline-offset-4 inline-block '>
            {song.artistInfo.artistName}
          </p>
        </Link> - {song.songName}
      </div>


    </div>
  )
}

export default Header