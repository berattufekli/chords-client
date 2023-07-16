import { selectSongById } from 'Store/main/songsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function Header() {

  const {id} = useParams();

  const song = useSelector((state) => selectSongById(state, id))
  return (
    <div>
      <p className='font-bold text-gray-700 text-xl'>{song.artistInfo.artistName} - {song.songName}</p>
    </div>
  )
}

export default Header