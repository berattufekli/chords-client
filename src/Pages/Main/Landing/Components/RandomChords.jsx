import React from 'react'
import { useSelector } from 'react-redux'
import { selectSongs } from 'Store/main/songsSlice'
import SongCollapse from 'Components/Collapse/SongCollapse';

function RandomChords() {

  const songs = useSelector(selectSongs);

  return (
    <SongCollapse title={"Deneme"} items={songs} open={false}></SongCollapse>
  )
}

export default RandomChords