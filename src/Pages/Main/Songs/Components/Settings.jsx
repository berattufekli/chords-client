import React from 'react'
import ChordsButton from './Buttons/ChordsButton';
import SpecialNoteButton from './SpecialNote/SpecialNoteButton';
import RepertuarButton from './Repertuar/RepertuarButton';
import RhythmButton from './Rhythm/RhythmButton';

function Settings() {



  return (
    <div className='flex flex-wrap ml-2'>
      <RepertuarButton />
      <RhythmButton />
      <SpecialNoteButton />
      <ChordsButton />
    </div >
  )
}

export default Settings