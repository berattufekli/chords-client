import Loading from 'Components/Loading/Loading';
import { getListById } from 'Store/main/listsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Header from './Components/Header';
import RepertuarList from './Components/RepertuarList';
import { getSongs } from 'Store/main/songsSlice';

function RepertuarDashboard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [songLoading, setSongLoading] = useState(true);

  useEffect(() => {
    dispatch(getListById(id)).then(() => setLoading(false));
    dispatch(getSongs()).then(() => setSongLoading(false));
  }, [dispatch, id])

  if (loading || songLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col pt-4 max-w-4xl px-2 my-1 m-auto'>
      <Header />
      <RepertuarList />
    </div>
  )
}

export default RepertuarDashboard