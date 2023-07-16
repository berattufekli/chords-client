import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openNewSongDialog } from 'Store/main/songsSlice';
import { selectSongs } from 'Store/main/songsSlice';
import SongRow from './Components/SongRow';

function SongsTable() {
  const dispatch = useDispatch();

  const songs = useSelector(selectSongs);

  const handleOpenNew = () => {
    dispatch(openNewSongDialog());
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex items-center justify-between content-center pb-4 bg-white dark:bg-gray-900">
        <div>
          <p className="focus:outline-none text-2xl font-bold leading-normal text-gray-700">Şarkılar</p>
          <p className="focus:outline-none text-md font-light leading-normal text-gray-500">Şarkılar Listesi</p>
        </div>

        <button
          type="submit"
          onClick={handleOpenNew}
          className="rounded-md w-32 bg-indigo-600 transition-all px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Şarkı Ekle
        </button>
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Sanatçı Adı
            </th>
            <th scope="col" className="px-6 py-3">
              Şarkı Adı
            </th>
            <th scope="col" className="px-6 py-3">
              Albüm Adı
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
        <tbody className="divide-y">
          {songs.map((item, key) => {
            return <SongRow key={key} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SongsTable;
