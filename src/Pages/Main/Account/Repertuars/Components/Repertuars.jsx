import React from 'react'
import NewList from './RepertuarDialog'
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from 'Store/main/listsSlice';
import ListItem from './RepertuarItem';
import { openNewListDialog } from 'Store/main/listsSlice';
import { closeNewListDialog } from 'Store/main/listsSlice';
import { closeEditListDialog } from 'Store/main/listsSlice';

function Repertuars({title, button, shadow}) {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);

  const { listDialog } = useSelector((state) => state.lists);

  console.log(listDialog)

  const handleShowList = () => {
    if(listDialog.props.open){
      dispatch(closeNewListDialog());
      dispatch(closeEditListDialog());
    }
    else{
      dispatch(openNewListDialog());
    }
  };



  return (
    <div className={`bg-white rounded-lg ${shadow ? "shadow-lg" : ""} px-4 space-y-2`}>
      
      <div className='flex justify-between my-2'>
        <p className='font-bold py-2  text-gray-700 text-lg'>{title}</p>
        <div className='flex items-center'>
          <button
            onClick={handleShowList}
            className="flex justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {button}
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

export default Repertuars