import React from 'react'
import ArtistRow from './Components/ArtistRow'
import { useDispatch, useSelector } from 'react-redux'
import { selectArtists } from 'Store/main/artistsSlice'
import { openNewArtistDialog } from 'Store/main/artistsSlice';


function ArtistTable() {
  const dispatch = useDispatch();

  const artists = useSelector(selectArtists);

  const handleOpenNew = () => {
    dispatch(openNewArtistDialog());
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex items-center justify-between content-center pb-4 bg-white dark:bg-gray-900">
        <div>
          <p className="focus:outline-none text-2xl font-bold leading-normal text-gray-700">
            Sanatçılar
          </p>
          <p className="focus:outline-none text-md font-light leading-normal text-gray-500">
            Sanatçılar Listesi
          </p>
        </div>

        <button
          type="submit"
          onClick={handleOpenNew}
          className="rounded-md w-32 bg-indigo-600 transition-all px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sanatçı Ekle
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table striped className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              İsim
            </th>
            <th scope="col" className="px-6 py-3">
              Açıklama
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
          {
            artists.map((item, key) => {
              return <ArtistRow key={key} item={item} />
            })
          }
        </table>
      </div>
    </div>

  )
}

export default ArtistTable