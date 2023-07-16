import React from 'react';
import moment from "moment";
import { Table } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { openEditSongChordDialog } from 'Store/main/songChordsSlice';
import { Link } from 'react-router-dom';

String.prototype.turkishtoEnglish = function () {
  return this.replace('Ğ', 'g')
    .replace('Ü', 'u')
    .replace('Ş', 's')
    .replace('I', 'i')
    .replace('İ', 'i')
    .replace('Ö', 'o')
    .replace('Ç', 'c')
    .replace('ğ', 'g')
    .replace('ü', 'u')
    .replace('ş', 's')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ç', 'c');
};

function SongChordsRow({ item }) {
  const dispatch = useDispatch();

  const editData = React.useCallback(() => {
    const sortedData = [...item.lyricsData].sort((a, b) => a.line - b.line);
    const sortedLineChord = [...item.chordsData].sort((a, b) => a.line - b.line);
    const sortedPosition = sortedLineChord.sort((a, b) => a.position - b.position);
    dispatch(openEditSongChordDialog({
      ...item,
      songLyrics: sortedData.map((item) => item.lyrics).join('\n'),
      sortedLyrics: sortedData,
      chordsData: sortedPosition,
    }));
  }, [dispatch, item]);

  console.log(item);

  return (
    <tr>
      <td>
        <p className='font-bold'>{item.artistId}</p>
      </td>
      <td className="px-6 py-4">
        <p className='font-bold'>{item.songName}</p>
      </td>
      <td className="px-6 py-4">
        <p className='font-bold'>{item.songAlbum}</p>
      </td>
      <td>
        <p className='font-bold'>{item.status}</p>
      </td>
      <td>
        <p className='font-bold'>{moment(item.createdDate).format("DD-MM-YYYY")}</p>
      </td>
      <td>
        <button
          onClick={editData}
          className="rounded-md bg-blue-600 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Akor Ekle
        </button>
      </td>
      <td>
        <Link
          to={
            `/akor/${item.artistInfo.artistName.split(" ").join("-").toLowerCase().turkishtoEnglish()}/${item.songName.toLowerCase().turkishtoEnglish()}/${item.songId}`}>
          <button
            className="rounded-md bg-indigo-600 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Önizle
          </button>
        </Link>
      </td>
    </tr>
  );
}

export default SongChordsRow;
