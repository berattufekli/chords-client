import React from 'react'
import { useSelector } from 'react-redux'
import { selectSongs } from 'Store/main/songsSlice'
import SongCollapse from 'Components/Collapse/SongCollapse'


function PopularChords() {

  const songs = useSelector(selectSongs)

  console.log(songs);
  return (
    <SongCollapse title={"Popüler Akorlar"} items={songs} open={true}></SongCollapse>
  )
}

export default PopularChords