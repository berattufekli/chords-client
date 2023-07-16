import React, { useEffect, useState } from 'react'
import ArtistTable from './ArtistTable'
import { useDispatch } from 'react-redux';
import { getArtists } from 'Store/main/artistsSlice';
import Loading from 'Components/Loading/Loading';
import ArtistDialog from './ArtistDialog';
import ArtistTable2 from './ArtistTable';

function AdminArtistDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getArtists()).then(() => setLoading(false));
  }, [dispatch]);

  if(loading){
    return <Loading />
  }

  return (
    <div className='bg-white m-4 rounded-lg shadow-lg '>
      {/* <ArtistTable /> */}
      <ArtistTable2 />
      <ArtistDialog />
    </div>
  )
}

export default AdminArtistDashboard