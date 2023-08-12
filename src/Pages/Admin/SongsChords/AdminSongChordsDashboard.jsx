import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from 'Components/Loading/Loading';
import SongChordsTable from './SongChordsTable';
import SongChordsDialog from './SongChordsDialog';
import { getSongs } from 'Store/main/songsSlice';


function AdminSongChordsDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getSongs()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='bg-white m-4 rounded-lg shadow-lg '>
      <SongChordsTable />
      <SongChordsDialog />
    </div>
  )
}

export default AdminSongChordsDashboard