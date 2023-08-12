import { selectSongById } from 'Store/main/songsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

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

function Header() {

  const { id } = useParams();

  

  const song = useSelector((state) => selectSongById(state, id))
  return (
    <div className='px-4 py-4'>
      <div className='flex items-center gap-2 font-bold text-gray-700 text-xl'>
        <img alt={song.artistInfo.artistName} src={song.artistInfo.url} className='w-20 h-20 rounded-md mr-2'>
        </img>
        <Link to={
          `/artist/${turkishtoEnglish(song.artistInfo.artistName.split(" ").join("-").toLowerCase())}/${song.artistInfo.artistId}`}>
          <p className='transition-all hover:underline underline-offset-4 inline-block '>
            {song.artistInfo.artistName}
          </p>
        </Link>
        <p>-</p>
        <p>{song.songName}</p>
      </div>


    </div>
  )
}

export default Header