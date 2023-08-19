
import React, { useEffect, useState } from 'react'
import PopularChords from './Components/PopularChords'
import { useDispatch } from 'react-redux'
import { getSongs } from 'Store/main/songsSlice';
import Loading from 'Components/Loading/Loading';
import { Helmet } from 'react-helmet';




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

      <Helmet>
        <meta property="og:title" content={"Akorlar Berat Tüfekli"} />
        <meta property='og:url' content='https://chords-berattufekli.netlify.app' />
        <meta property='og:site_name' content='Akorlar Berat Tüfekli' />
        <meta property='og:author' content='Hüseyin Berat Tüfekli' />
        <meta property='og:publisher' content='Hüseyin Berat Tüfekli' />
      </Helmet>

      <PopularChords />


    </div>
  )
}

export default LandingDashboard