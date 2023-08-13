import React, { useEffect, useState } from 'react'
import Repertuars from './Components/Repertuars'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'Components/Loading/Loading';
import { getListByUser } from 'Store/main/listsSlice';

function RepertuarsTab() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  console.log(userId);
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
      <Repertuars title={"Listeler"} button={"Yeni Liste Ekle"} shadow={true}/>
    </div>
  )
}

export default RepertuarsTab