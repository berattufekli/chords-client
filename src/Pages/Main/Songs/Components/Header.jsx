import { selectSongById } from 'Store/main/songsSlice';
import TurkishtoEnglish from 'lib/TurkishToEnglish';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'


function Header() {

  const { id } = useParams();

  const location = useLocation();

  const song = useSelector((state) => selectSongById(state, id))
  const { artistName } = song.artistInfo;
  const { songName } = song;
  return (
    <div className='px-4 py-4'>
      <Helmet>
        <link rel="canonical" href={location.pathname} />
        <meta name="robots" content="index,follow" />
        <title>{`${artistName} - ${songName} - Akor (Kolay ve Orijinal Ton)`}</title>
        <meta property='og:url' content='https://akorflex.com' />
        <meta property='og:site_name' content='AkorF' />
        <meta property='og:author' content='Hüseyin Berat Tüfekli' />
        <meta property='og:publisher' content='Hüseyin Berat Tüfekli' />
        <meta name="description" content={`${songName} - ${artistName} akor, kolay ve orjinal ton gitar akorları, ${artistName} cevapsiz ${artistName} | AkorFlex.com`} />
        <meta property="og:title" content={`${artistName} - ${songName} Akor (Kolay ve Orjinal Ton)`} />
        <meta property="og:description" content={`Dinlediğiniz şarkı: ${songName} - ${artistName}`} />
      </Helmet>
      <div className='flex items-center gap-2 font-bold text-gray-700 text-xl'>
        <img alt={song.artistInfo.artistName} src={song.artistInfo.url} className='w-20 h-20 rounded-md mr-2'>
        </img>
        <div className='flex sm:items-center flex-col sm:flex-row gap-0 sm:gap-2'>
          <Link to={
            `/artist/${TurkishtoEnglish(song.artistInfo.artistName.split(" ").join("-").toLowerCase())}/${song.artistInfo.artistId}`}>
            <h1 className='transition-all hover:underline underline-offset-4 inline-block text-xl'>
              {song.artistInfo.artistName}
            </h1>
          </Link>
          <p className='hidden sm:flex'>-</p>
          <h1 className='text-xl'>{song.songName}</h1>
        </div>
      </div>


    </div>
  )
}

export default Header