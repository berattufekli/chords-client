import Loading from 'Components/Loading/Loading';
import { selectSongById } from 'Store/main/songsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ToneValues from './ToneValues';
import { setDefault } from 'Store/main/applicationSlice';



function Lyrics({ tone, setTone }) {

  const { id } = useParams();
  const [lyrics, setLyrics] = useState(false);
  const [chords, setChords] = useState(false);

  const { settings } = useSelector((state) => state.applicationSlice);
  const song = useSelector((state) => selectSongById(state, id));
  const dispatch = useDispatch();

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

    const tone = ToneValues.find((f) => f.key === song.originalTone);
    setTone(tone);
    
  }, [song, setTone, dispatch])

  useEffect(() => {
    dispatch(setDefault());
  }, [id])


  if (!lyrics && !chords) {
    return <Loading />
  }
  return (
    <div className='grid grid-row-2 p-4 mb-3'>
      {
        lyrics.map((item, key) => {


          const found = chords.filter((f) => f.line === item.line);
          const sortedFound = found.sort((a, b) => a.position - b.position);


          if (item.lyrics === "" && sortedFound.length === 0) {
            return <div key={key} className='w-4 h-6'></div>
          }

          return <div key={key} className='col-span-full'>
            <div className='w-full'>
              {
                sortedFound.map((item, key) => {
                  if (settings.showChords) {
                    const chord = song.chordsInfo.find((f) => f._id === item.chordId)

                    if (tone.key === "Easy_tone") {
                      return <p
                        key={key}
                        style={{ transform: `translateX(${item.position}px)` }}
                        className='font-bold inline-block text-sm text-indigo-600'
                      >
                        {chord[song.easyTone]}
                      </p>
                    }
                    return (
                      <p
                        key={key}
                        style={{ transform: `translateX(${item.position}px)` }}
                        className='font-bold inline-block text-sm text-indigo-600'
                      >
                        {chord[tone.key]}

                      </p>
                    );
                  }

                  return null;
                })
              }
            </div>

            {
              settings.showChords ? <p key={key} className='font-semi-bold leading-3 text-gray-700'>{item.lyrics}</p> : <p key={key} className='font-semi-bold text-gray-700'>{item.lyrics}</p>
            }

          </div>

        })
      }




    </div>
  )
}

export default Lyrics