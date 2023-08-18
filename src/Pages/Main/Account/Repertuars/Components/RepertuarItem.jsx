import { GlobeEuropeAfricaIcon, LockClosedIcon, PencilSquareIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { openEditListDialog } from 'Store/main/listsSlice';
import { removeList } from 'Store/main/listsSlice';
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';


function ListItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeList(item._id));
  }

  const handleEditList = () => {
    dispatch(openEditListDialog({ ...item }));
  }

  const handleShare = () => {
    const link = `http://localhost:3000/repertuar/${item.listId}`;

    try {
      navigator.clipboard.writeText(link);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className='sm:items-center flex-row justify-between border-[1px] shadow-sm rounded-md p-2 flex my-2'>
      <div className='flex items-center '>
        {
          item.type === "public" ? <GlobeEuropeAfricaIcon className="h-5 w-5 flex-shrink-0 rounded-full mr-2" />
            :
            <LockClosedIcon className="h-5 w-5 flex-shrink-0 rounded-full mr-2" />
        }

        <Link to={`/repertuar/${item.listId}`} className='text-gray-700 font-semibold'>{item.listName}</Link>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={handleShare}
          className="flex justify-center items-center rounded-md bg-blue-700 px-1  py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ShareIcon className='w-5 h-5' />
        </button>
        <button
          onClick={handleEditList}
          className="flex justify-center items-center rounded-md bg-amber-500 px-1  py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <PencilSquareIcon className='w-5 h-5' />
        </button>
        <button
          onClick={handleRemove}
          className="flex justify-center items-center rounded-md bg-red-600 px-1 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <TrashIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default ListItem