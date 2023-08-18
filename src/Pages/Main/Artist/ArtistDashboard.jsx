import Loading from 'Components/Loading/Loading';
import { getArtist } from 'Store/main/artistsSlice';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import Header from './Components/Header';
import { getArtistSongs } from 'Store/main/songsSlice';
import SongList from './Components/SongsList';

function ArtistDashboard() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(getArtistSongs(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col pt-4 max-w-4xl px-2 my-1 m-auto'>
      <Header />
      <SongList />
    </div>
  )
}

export default ArtistDashboard