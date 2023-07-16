import React from 'react'
import Collapse from 'Components/Collapse/Collapse'
import { useSelector } from 'react-redux'
import { selectSongs } from 'Store/main/songsSlice'


function RandomChords() {

  const songs = useSelector(selectSongs);

  return (
    <Collapse title={"Deneme"} items={songs} open={false}></Collapse>
  )
}

export default RandomChords