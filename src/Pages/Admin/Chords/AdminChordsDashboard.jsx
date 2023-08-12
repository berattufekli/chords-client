import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from 'Components/Loading/Loading';
import { getChords } from 'Store/main/chordsSlice';
import ChordsDialog from './ChordsDialog';
import ChordsTable from './ChordsTable';
import { getSongs } from 'Store/main/songsSlice';

function AdminChordsDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState(true);
  useEffect(() => {
    dispatch(getChords()).then(() => setLoading(false));
    dispatch(getSongs()).then(() => setSongsLoading(false));
    
  }, [dispatch]);

  if (loading || songsLoading) {
    return <Loading />
  }

  return (
    <div className='bg-white m-4 rounded-lg shadow-lg '>
      <ChordsTable />
      <ChordsDialog />
    </div>
  )
}

export default AdminChordsDashboard