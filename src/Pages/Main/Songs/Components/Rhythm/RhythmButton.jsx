import { setSettings } from 'Store/main/applicationSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function RhythmButton() {
  const { settings } = useSelector((state) => state.applicationSlice);
  const dispatch = useDispatch();

  const handleShowRhythm = () => {
    dispatch(setSettings({
      ...settings,
      showRhythm: !settings.showRhythm,
      showRepertuarList: false,
      showSpecialNote: false,
    }))
  }

  if (settings.showRhythm) {
    return <button onClick={handleShowRhythm} className="rounded-md mr-1 my-2 px-3 h-8 bg-indigo-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Ritimi Göster
    </button>
  }

  return (
    <button onClick={handleShowRhythm} className="rounded-md mr-1 my-2 px-3 h-8 bg-gray-300 transition-all  text-sm font-bold text-gray-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Ritimi Göster
    </button>
  )
}

export default RhythmButton