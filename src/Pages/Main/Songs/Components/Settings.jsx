import React from 'react'
import ChordsButton from './Buttons/ChordsButton';
import SpecialNoteButton from './SpecialNote/SpecialNoteButton';
import RepertuarButton from './Repertuar/RepertuarButton';

function Settings() {



  return (
    <div className='flex flex-wrap ml-2'>
      <RepertuarButton />
      <button className="rounded-md mr-1 my-2 px-3 h-8 bg-gray-300 transition-all  text-sm font-bold text-gray-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Ritim
      </button>
      <SpecialNoteButton />
      <ChordsButton />
    </div >
  )
}

export default Settings