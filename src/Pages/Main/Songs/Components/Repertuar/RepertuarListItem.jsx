import { GlobeEuropeAfricaIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { getListByUser } from 'Store/main/listsSlice';
import { removeRepertuarSong } from 'Store/main/repertuarSongsSlice';
import { addRepertuarSong } from 'Store/main/repertuarSongsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function RepertuarListItem({ item }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [isInclude, setIsInclude] = useState(false);
  const [song, setSong] = useState();


  useEffect(() => {
    const song = item.songs.find((f) => f.songId === id);
    if (song === undefined) {
      setIsInclude(false);
    }
    else {
      setIsInclude(true);
      setSong(song);
    }

    console.log(song);
  }, [id, isInclude, item.songs])


  const handleSubmit = () => {
    if (!isInclude) {
      let data = {
        listId: item._id,
        songId: id,
      }

      dispatch(addRepertuarSong(data))
        .then(() => dispatch(getListByUser(userId)))
        .then(() => setIsInclude(true))
        .then(() => (toast.success('Repertuara Eklendi', {
          position: 'bottom-center',
          autoClose: 5000, // 3 saniye sonra otomatik olarak kapanacak
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })))
    }
    else {
      dispatch(removeRepertuarSong(song._id))
        .then(() => dispatch(getListByUser(userId)))
        .then(() => setIsInclude(false))
        .then(() => (toast.error('Repertuardan  Çıkarıldı', {
          position: 'bottom-center',
          autoClose: 5000, // 3 saniye sonra otomatik olarak kapanacak
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })))
    }
  }


  return (
    <div className='border-[1px] items-center justify-between shadow-sm rounded-md p-2 flex my-1'>
      <div className='flex items-center'>
        <input onChange={handleSubmit} type="checkbox" checked={isInclude ? true : false} className='mr-4 w-5 h-5 text-indigo-600 border-gray-400 focus:ring-indigo-600 rounded-md' />
        <p className='text-gray-700 font-semibold'>
          {item.listName}
        </p>
      </div>

      <div className='flex items-center'>
        {
          item.type === "public" ? <GlobeEuropeAfricaIcon className="h-5 w-5 flex-shrink-0 rounded-full mx-2" />
            :
            <LockClosedIcon className="h-5 w-5 flex-shrink-0 rounded-full mx-2" />
        }
      </div>
    </div>
  )
}

export default RepertuarListItem