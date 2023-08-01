import React, { useState } from 'react'
import NewList from './ListDialog'
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from 'Store/main/listsSlice';
import ListItem from './ListItem';
import { openNewListDialog } from 'Store/main/listsSlice';
import { closeNewListDialog } from 'Store/main/listsSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Lists() {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  const { listDialog } = useSelector((state) => state.lists);

  console.log(listDialog)

  const handleShowList = () => {
    dispatch(openNewListDialog());
  };



  return (
    <div className='bg-white rounded-lg shadow-lg px-4 space-y-2'>
      
      <div className='flex justify-between my-2'>
        <p className='font-bold py-2  text-gray-700 text-lg'>Listeler</p>
        <div className='flex items-center'>
          <button
            onClick={handleShowList}
            className="flex justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Yeni Liste Oluştur
          </button>
        </div>
      </div>

      <div>
        {
          listDialog.props.open &&
          <div className='mt-2'>
            <NewList />
          </div>
        }
      </div>

      <ToastContainer />

      <div>
        {
          lists.map((item, key) => {
            return <ListItem key={key} item={item} />
          })
        }
      </div>
    </div>
  )
}

export default Lists