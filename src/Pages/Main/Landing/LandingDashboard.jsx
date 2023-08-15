
import React, { useEffect, useState } from 'react'
import PopularChords from './Components/PopularChords'
import RandomChords from './Components/RandomChords'
import { useDispatch } from 'react-redux'
import { getSongs } from 'Store/main/songsSlice';
import Loading from 'Components/Loading/Loading';




function LandingDashboard() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSongs()).then(() => setLoading(false));
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='pt-4'>
      <PopularChords />


    </div>
  )
}

export default LandingDashboard