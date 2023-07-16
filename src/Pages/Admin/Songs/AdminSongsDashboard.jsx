import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from 'Components/Loading/Loading';
import SongsTable from './SongsTable';
import SongsDialog from './SongsDialog';
import { getSongs } from 'Store/main/songsSlice';
import { getArtists } from 'Store/main/artistsSlice';


function AdminSongsDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);
  
  useEffect(() => {
    dispatch(getSongs()).then(() => setLoading(false));
    dispatch(getArtists()).then(() => setArtistsLoading(false));
  }, [dispatch]);

  if (loading || artistsLoading) {
    return <Loading />
  }

  return (
    <div className='bg-white m-4 rounded-lg shadow-lg '>
      <SongsTable />
      <SongsDialog />
    </div>
  )
}

export default AdminSongsDashboard