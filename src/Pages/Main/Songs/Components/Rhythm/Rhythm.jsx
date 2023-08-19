import { selectSongById } from 'Store/main/songsSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Rhythm() {
  const { id } = useParams();
  const { settings } = useSelector((state) => state.applicationSlice);
  const song = useSelector((state) => selectSongById(state, id))

  if (settings.showRhythm) {
    return (
      <div className='m-2 flex'>
        <p className='bg-gray-300 block rounded-md px-4 py-1 text-gray-600 font-bold text-sm shadow-sm'>
          {song.rhythm}
        </p>
      </div>
    )
  }
}

export default Rhythm