import React from 'react'
import moment from "moment";
import { openEditArtistDialog } from 'Store/main/artistsSlice';
import { useDispatch } from 'react-redux';

function ArtistRow({ item }) {

  const dispatch = useDispatch();

  const editData = React.useCallback(() => {
    dispatch(openEditArtistDialog(item));
  }, [dispatch, item]);

  return (
    <tr>
      <td>
        <p className='font-bold'>{item.artistId}</p>
      </td>
      <td>
        <div className='flex items-center'>
          <img
            className="inline-block w-8 h-8 rounded-lg"
            src={item.url}
            alt=""
          />
          <p className='ml-3 font-bold'>{item.artistName}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className='font-bold'>{item.artistDescription}</p>
      </td>
      <td>
        <div className="flex items-center">
          <p className='font-bold'>{item.status}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <p className='font-bold'>{moment(item.createdDate.seconds).format("DD-MM-YYYY")}</p>
        </div>
      </td>
      <td>
        <button
          onClick={editData}
          className="rounded-md bg-blue-600 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Düzenle
        </button>
      </td>
    </tr>
  )
}

export default ArtistRow
