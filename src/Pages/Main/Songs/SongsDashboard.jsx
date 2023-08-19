
import Loading from 'Components/Loading/Loading';
import { getSongs } from 'Store/main/songsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header';
import Lyrics from './Components/Lyrics';
import Tones from './Components/Tones';
import Settings from './Components/Settings';
import { useParams } from 'react-router-dom';
import NotFound from '../404/NotFound';
import SpecialNote from './Components/SpecialNote/SpecialNote';
import RepertuarList from './Components/Repertuar/RepertuarList';
import { getSongNoteSongAndUserId } from 'Store/main/songNotesSlice';
import Rhythm from './Components/Rhythm/Rhythm';

function SongsDashboard() {
  const { id } = useParams();
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(true);
  const [tone, setTone] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    dispatch(getSongs())
      .then((params) => {
        try {
          const song = params.payload.find((f) => f.songId === id);
          if (song === undefined) {
            setNotFound(true);
          }
        } catch (error) {
          setNotFound(true);
        }
      })
      .then(() => setLoading(false)).then();

    dispatch(getSongNoteSongAndUserId({ songId: id, userId }))
      .then(() => setNoteLoading(false));
  }, [dispatch, id, userId]);

  if (notFound) {
    return <NotFound />
  }

  if (loading || noteLoading) {
    return <Loading />
  }


  return (
    <div className='flex max-w-4xl my-10 m-auto'>
      <div className='w-full bg-white my-5 shadow-lg rounded-lg mx-2 xl:mx-0' >
        <Header />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Settings />
        <Rhythm />
        <RepertuarList />
        <SpecialNote />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Tones tone={tone} setTone={setTone} />
        <div className='w-full h-[1px] bg-slate-200 rounded-sm'></div>
        <Lyrics tone={tone} setTone={setTone} />
      </div>
    </div>
  )
}

export default SongsDashboard