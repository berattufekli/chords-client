import Loading from 'Components/Loading/Loading';
import { getListById } from 'Store/main/listsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Header from './Components/Header';
import RepertuarList from './Components/RepertuarList';

function RepertuarDashboard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getListById(id)).then(() => setLoading(false));
  }, [dispatch])

  if(loading){
    return <Loading />
  }

  return (
    <div className='flex flex-col max-w-4xl my-10 m-auto'>
      <Header />
      <RepertuarList />
    </div>
  )
}

export default RepertuarDashboard