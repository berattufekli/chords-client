import React from 'react';
import moment from "moment";
import { Table } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { openEditSongDialog } from 'Store/main/songsSlice';
import { imageProxy } from "Store/features/proxy";

function SongRow({ item }) {
  const dispatch = useDispatch();

  const editData = React.useCallback(() => {
    const sortedData = [...item.lyricsData].sort((a, b) => a.line - b.line);
    dispatch(openEditSongDialog({
      ...item,
      songLyrics: sortedData.map((item) => item.lyrics).join('\n'),
    }));
  }, [dispatch, item]);

  return (
    <tr>
      <td>
        <p className='font-bold'>{item.songId}</p>
      </td>
      <td>
        <div className='flex items-center'>
          <img
            className="inline-block w-8 h-8 rounded-lg"
            src={item.artistInfo && `${imageProxy}/${item.artistInfo.url}`}
            alt=""
          />
          <p className='ml-3 font-bold'>{item.artistInfo && item.artistInfo.artistName}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className='font-bold'>{item.songName}</p>
      </td>
      <td>
        <p className='font-bold'>{item.songAlbum}</p>
      </td>
      <td>
        <div className="flex items-center">
          <p className='font-bold'>{item.status}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <p className='font-bold'>{moment(item.createdDate).format("DD-MM-YYYY")}</p>
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
  );
}

export default SongRow;
