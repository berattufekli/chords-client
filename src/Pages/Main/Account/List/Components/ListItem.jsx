import { GlobeEuropeAfricaIcon, LockClosedIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { closeEditListDialog } from 'Store/main/listsSlice';
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
    dispatch(openEditListDialog({...item}));
  }

  return (
    <div className='sm:items-center gap-2 sm:flex-row flex-col justify-between border-[1px] shadow-sm rounded-md p-2 flex my-2'>
      <div className='flex items-center '>
        {
          item.type === "public" ? <GlobeEuropeAfricaIcon className="h-5 w-5 flex-shrink-0 rounded-full mr-2" />
            :
            <LockClosedIcon className="h-5 w-5 flex-shrink-0 rounded-full mr-2" />
        }

        <Link to={"/akor"} className='text-gray-700 font-semibold'>{item.listName}</Link>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={handleEditList}
          className="flex justify-center items-center rounded-md bg-yellow-400 px-2  py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <PencilSquareIcon className='w-5 h-5' />
        </button>
        <button
          onClick={handleRemove}
          className="flex justify-center items-center rounded-md bg-red-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <TrashIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default ListItem