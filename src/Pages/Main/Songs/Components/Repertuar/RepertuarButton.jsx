import { setSettings } from 'Store/main/applicationSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function RepertuarButton() {
  const { settings } = useSelector((state) => state.applicationSlice);
  const dispatch = useDispatch();

  const handleShowChords = () => {
    dispatch(setSettings({
      ...settings,
      showSpecialNote: false,
      showRepertuarList: !settings.showRepertuarList,
    }))
  }

  if (settings.showRepertuarList) {
    return <button onClick={handleShowChords} className="rounded-md mr-1 my-2 px-3 h-8 bg-indigo-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Repertuara Ekle
    </button>
  }

  return (
    <button onClick={handleShowChords} className="rounded-md mr-1 my-2 px-3 h-8 bg-gray-300 transition-all  text-sm font-bold text-gray-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Repertuara Ekle
    </button>
  )
}

export default RepertuarButton