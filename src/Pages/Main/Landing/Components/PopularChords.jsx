import React from 'react'
import Collapse from 'Components/Collapse/Collapse'
import { useSelector } from 'react-redux'
import { selectSongs } from 'Store/main/songsSlice'


function PopularChords() {

  const songs = useSelector(selectSongs)

  console.log(songs);
  return (
    <Collapse title={"Popüler Akorlar"} items={songs} open={true}></Collapse>
  )
}

export default PopularChords