import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChordsRow from './Components/ChordsRow';
import { openNewChordDialog } from 'Store/main/chordsSlice';
import { selectChords } from 'Store/main/chordsSlice';

function ChordsTable() {
  const dispatch = useDispatch();
  const chords = useSelector(selectChords);

  const handleOpenNew = () => {
    dispatch(openNewChordDialog());
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex items-center justify-between content-center pb-4 bg-white dark:bg-gray-900">
        <div>
          <p className="focus:outline-none text-2xl font-bold leading-normal text-gray-700">Akorlar</p>
          <p className="focus:outline-none text-md font-light leading-normal text-gray-500">Akorlar Listesi</p>
        </div>

        <button
          type="submit"
          onClick={handleOpenNew}
          className="rounded-md w-32 bg-indigo-600 transition-all px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Akor Ekle
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Akor No
              </th>
              <th scope="col" className="px-6 py-3">
                Akor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Şarko ID
              </th>
              <th scope="col" className="px-6 py-3">
                C Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                C# Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Db Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                D Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                D# Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Eb Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                E Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                F Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                F# Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Gb Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                G Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                G# Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Ab Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                A Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                A# Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Bb Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                B Tonu
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Oluşturulma Tarihi
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {
            chords.map((item, key) => {
              return <ChordsRow key={key} item={item} />;
            })
          }
        </table>
      </div>
    </div>
  );
}

export default ChordsTable;