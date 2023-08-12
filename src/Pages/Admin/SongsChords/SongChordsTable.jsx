import React from 'react';
import { useSelector } from 'react-redux';
import SongChordsRow from './Components/SongChordRow';
import { selectSongs } from 'Store/main/songsSlice';

function SongChordsTable() {
  const songs = useSelector(selectSongs);

  console.log(songs);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex items-center justify-between content-center pb-4 bg-white dark:bg-gray-900">
        <div>
          <p className="focus:outline-none text-2xl font-bold leading-normal text-gray-700">Akorlar</p>
          <p className="focus:outline-none text-md font-light leading-normal text-gray-500">Akorlar Listesi</p>
        </div>
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className='text-center'>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Şarkı
            </th>
            <th scope="col" className="px-6 py-3">
              Albüm
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
            <th scope="col" className="px-6 py-3">
              Önizle
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {songs.map((item, key) => {
            return <SongChordsRow key={key} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SongChordsTable;
