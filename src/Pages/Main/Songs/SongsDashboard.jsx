
import Loading from 'Components/Loading/Loading';
import { getSongs } from 'Store/main/songsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from './Components/Header';
import Lyrics from './Components/Lyrics';
import Tones from './Components/Tones';
import Settings from './Components/Settings';
import { useParams } from 'react-router-dom';
import NotFound from '../404/NotFound';

function SongsDashboard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [tone, setTone] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    dispatch(getSongs())
      .then((params) => {
        try {
          const song = params.payload.find((f) => f.id == id);
          if(song === undefined){
            setNotFound(true);
          }
        } catch (error) {
          setNotFound(true);
        }
      })
      .then(() => setLoading(false)).then();

  }, [dispatch, id]);

  if (notFound) {
    return <NotFound />
  }

  if (loading) {
    return <Loading />
  }


  return (
    <div className='flex max-w-4xl my-10 m-auto'>
      <div className='w-full bg-white  my-5 shadow-lg rounded-lg mx-2 xl:mx-0' >
        <Header />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Settings />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Tones tone={tone} setTone={setTone} />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Lyrics tone={tone} setTone={setTone} />
      </div>
    </div>
  )
}

export default SongsDashboard