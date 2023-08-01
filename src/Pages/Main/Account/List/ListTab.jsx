import React, { useEffect, useState } from 'react'
import Lists from './Components/Lists'
import { useDispatch, useSelector } from 'react-redux'
import { getListByUser } from 'Store/main/listsSlice';
import Loading from 'Components/Loading/Loading';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function ListTab() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getListByUser(userId))
      .then(() => setLoading(false));
  }, [userId, dispatch]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col space-y-4'>
      
      <Lists />
    </div>
  )
}

export default ListTab