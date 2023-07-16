import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import { useDispatch } from 'react-redux';
import Loading from 'Components/Loading/Loading';
import { getSongs } from 'Store/main/songsSlice';
import Lyrics from './Components/Lyrics';

function AdminPreviewSongDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    dispatch(getSongs()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading />
  }
  return (
    <div className='flex max-w-3xl my-10 m-auto'>
      <div className='w-full bg-white p-4 my-5 shadow-lg rounded-lg mx-2 xl:mx-0' >
        <Header />
        <div className='w-full h-1 my-2 bg-slate-200 rounded-sm'></div>
        <Lyrics />
      </div>
    </div>
  )
}

export default AdminPreviewSongDashboard