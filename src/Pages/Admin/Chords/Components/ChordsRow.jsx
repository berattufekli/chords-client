import React from 'react';
import moment from "moment";
import { Table } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { openEditChordDialog } from 'Store/main/chordsSlice';

function ChordsRow({ item }) {
  const dispatch = useDispatch();

  console.log(item);

  const editData = React.useCallback(() => {
    dispatch(openEditChordDialog(item));
  }, [dispatch, item]);

  return (
    <tr>
      <td className='py-4'>
        <p className='font-bold'>{item.chordId}</p>
      </td>
      <td>
        <p className='font-bold text-red-500'>{item.chordNo}</p>
      </td>
      <td>
        <p className='font-bold text-red-500'>{item.chordName}</p>
      </td>
      <td>
        <p className='font-bold text-red-500'>{item.songId}</p>
      </td>
      <td>
        <p className='font-bold'>{item.C_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.C_sharp_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.Db_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.D_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.D_sharp_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.Eb_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.E_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.F_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.F_sharp_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.Gb_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.G_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.G_sharp_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.Ab_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.A_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.A_sharp_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.Bb_tone}</p>
      </td>
      <td>
        <p className='font-bold'>{item.B_tone}</p>
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
          Düzenle
        </button>
      </td>
    </tr>
  );
}

export default ChordsRow;