import Loading from 'Components/Loading/Loading';
import { selectSongById } from 'Store/main/songsSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Lyrics() {

  const { id } = useParams();
  const [lyrics, setLyrics] = useState(false);
  const [chords, setChords] = useState(false);

  const song = useSelector((state) => selectSongById(state, id))
  console.log(song);
  useEffect(() => {
    const lines = song.lyrics.map((lyrics, key) => {
      return { 
        line: key, // Sıra numarasını eklemek için "key + 1" kullanılır
        lyrics
      };
    });
    const sortedLineChord = [...song.chordsData].sort((a, b) => a.line - b.line);
    setLyrics(lines);
    setChords(sortedLineChord);
  }, [song])

  console.log(lyrics);

  if (!lyrics && !chords) {
    return <Loading />
  }
  return (
    <div>
      {
        lyrics.map((item, key) => {


          const found = chords.filter((f) => f.line === item.line);
          const sortedFound = found.sort((a, b) => a.position - b.position);

          
          if(item.lyrics === ""){
            return <div className='w-4 h-6'></div>
          }

          return <div className='col-span-full'>
            <div className='w-full'>
              {sortedFound.map((item) => {
                const chord = song.chordsInfo.find((f) => f.chordId === item.chordId)
                return (
                  <p
                    style={{ transform: `translateX(${item.position}px)` }}
                    className='font-bold inline-block text-sm text-red-500'
                  >
                    {chord.chordName}
                  </p>
                );
              })}
            </div>
            
            <p key={key} className='font-semi-bold leading-3 text-gray-700'>{item.lyrics}</p>
          </div>

        })
      }



      
    </div>
  )
}

export default Lyrics