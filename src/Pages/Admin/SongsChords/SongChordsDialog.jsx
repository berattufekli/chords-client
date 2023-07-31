import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from 'Hooks/useForm';
import SelectLine from './Components/SelectLine';
import Draggable from 'react-draggable';
import { closeEditSongChordDialog } from 'Store/main/songChordsSlice';
import { closeNewSongChordDialog } from 'Store/main/songChordsSlice';
import SelectChord from './Components/SelectChord';
import { addSongChord } from 'Store/main/songChordsSlice';
import { getSongs } from 'Store/main/songsSlice';
import { updateSongChord } from 'Store/main/songChordsSlice';
import { openEditSongChordDialog } from 'Store/main/songChordsSlice';


const defaultFormState = {
  _id: 0,
  songName: "",
  songAlbum: "",
  songLyrics: "",
  artistId: 0,
  url: "",
};

export default function SongChordsDialog() {
  const dispatch = useDispatch();

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const [lineValue, setLineValue] = useState(0);
  const [chordValue, setChordValue] = useState(false);
  const [editChordValue, setEditChordValue] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [chordSelected, setChordSelected] = useState(false);

  const chordDialog = useSelector(
    ({ songChords }) => songChords.chordDialog
  );


  console.log(chordDialog.data);

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (chordDialog.type === "edit" && chordDialog.data) {
      setForm({
        ...chordDialog.data,
      });
      setLineValue(chordDialog.data.numberedLines[0]);
    }

    /**
     * Dialog type: 'new'
     */
    if (chordDialog.type === "new") {
      setForm({
        ...defaultFormState,
        ...chordDialog.data,
      });

    }
  }, [chordDialog.data, chordDialog.type, setForm]);


  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (chordDialog.props.open) {
      initDialog();
    }
  }, [chordDialog.props.open, initDialog]);


  const cancelButtonRef = useRef(null)

  function closeDialog() {
    setLineValue(1);
    setChordValue(false);
    setChordSelected(false);
    setEditChordValue(false);

    return chordDialog.type === "edit"
      ? dispatch(closeEditSongChordDialog())
      : dispatch(closeNewSongChordDialog());
  }

  function handleSubmit(event) {

  }



  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const bounds = {
    left: 0,
    top: 0,
    right: 500,
    bottom: 500
  };

  const handleEditSongChord = (chordValue, editChord) => {
    setChordSelected(true);
    setChordValue(chordValue);
    setEditChordValue(editChord);
    setPosition({ x: editChord.position, y: 0 });
  }

  const handleDeleteChord = () => {
    setChordSelected(false);
    setChordValue(false);
    setEditChordValue(false);
  }

  const handleSaveChords = () => {
    if (!editChordValue) {
      let data = {
        songId: form._id,
        line: lineValue.line,
        chordId: chordValue._id,
        chordName: chordValue.chordName,
        position: position.x,
      }

      console.log(data);
      setChordValue(false);
      setChordSelected(false);
      setPosition({ x: 0, y: 0 });
      dispatch(addSongChord(data)).then((songChord) => {
        dispatch(getSongs()).then((songs) => {

          console.log("SC", songChord);
          console.log("S", songs);
          const song = songs.payload.find((item) => item._id === songChord.payload.songId);

          const lines = song.lyrics.map((lyric, key) => {
            return { 
              line: key, // Sıra numarasını eklemek için "key + 1" kullanılır
              lyric
            };
          });
      
      
          const sortedLineChord = [song.chordsData].sort((a, b) => a.line - b.line);
          const sortedPosition = sortedLineChord.sort((a, b) => a.position - b.position);
          dispatch(openEditSongChordDialog({
            ...song,
            numberedLines: lines,
            chordsData: sortedPosition,
          }));
          setLineValue(chordDialog.data.numberedLines[0]);
        })
      });

    }
    else {
      let data = {
        songId: form._id,

        chordId: editChordValue._id,
        chordName: editChordValue.chordName,
        position: position.x,
      }
      setEditChordValue(false);
      setChordSelected(false);
      dispatch(updateSongChord(data));
    }
  }

  return (
    <Transition.Root show={chordDialog.props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full  justify-center text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:max-w-3xl">
                <div className="border-b border-gray-900/10">
                  <h2 className="text-xl bg-gray-50 shadow-md font-bold leading-7 p-4 text-gray-900">Akor Bilgileri</h2>

                  {/* Scroll Yüzünden Genişliği Artıyor*/}
                  <div className="grid grid-cols-1 gap-y-2 my-2 px-4 sm:grid-cols-6 max-h-screen overflow-scroll">
                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Şarkı ID
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="_id"
                            id="_id"
                            value={form._id}
                            onChange={handleChange}
                            disabled
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sanatçı Adınız Giriniz"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      {
                        chordDialog.data !== null &&
                        <SelectLine lineValue={lineValue} setLineValue={setLineValue} lines={chordDialog.data.numberedLines} />
                      }
                    </div>

                    <div className='col-span-full'>
                      {
                        chordDialog.data !== null &&
                        <SelectChord chordValue={chordValue} setChordValue={setChordValue} chords={chordDialog.data.chordsInfo} />

                      }
                    </div>

                    <div className="col-span-full">
                      <div className='flex items-center'>
                        {
                          chordSelected === false ? <div className='flex'>

                            <button
                              className="rounded-md w-36 bg-blue-600 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => setChordSelected(true)}
                            >
                              Akor Ekle
                            </button>
                          </div> : <button
                            className="rounded-md w-36 bg-indigo-600 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSaveChords}
                          >
                            {editChordValue === false ? "Akoru Kaydet" : "Akoru Güncelle"}
                          </button>
                        }


                        <button
                          type="button"
                          className="inline-flex w-24 ml-1 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                          onClick={handleDeleteChord}
                        >
                          {editChordValue === false ? "Sil" : "İptal"}
                        </button>

                        <p className='ml-2 font-bold text-gray-700'>X:{position.x}</p>


                      </div>
                      <div className="mt-1">
                        {/* Ana Div */}
                        <div className="flex p-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 flex-col">

                          <div>
                            {
                              chordDialog.data && chordDialog.data.chordsInfo && chordDialog.data.chordsData.map((chord, key) => {
                                console.log("BERAT", chord);

                                const { chordsInfo } = chordDialog.data;

                                const matchChord = chordsInfo.find((f) => f._id === chord.chordId);

                                if (editChordValue !== false && editChordValue.songChordId === chord.songChordId) {
                                  return <Draggable
                                    key={key}
                                    bounds={bounds}
                                    position={{
                                      x: position.x,
                                      y: 0,
                                    }}
                                    onDrag={(e, data) => trackPos(data)}
                                    axis="x">
                                    <p style={{ cursor: "pointer", display: "inline-block" }} className='text-red-500 font-bold'>{chordValue.chordName}</p>
                                  </Draggable>
                                }

                                return lineValue.line === chord.line ?
                                  <p
                                    onDoubleClick={() => handleEditSongChord(matchChord, chord)}
                                    key={key} className='text-red-500 font-bold inline-block'
                                    style={{ transform: `translateX(${chord.position}px)` }}>
                                    {matchChord.chordName}
                                  </p> : null
                              })
                            }
                            {
                              !editChordValue && chordSelected && <Draggable
                                bounds={bounds}
                                position={{
                                  x: position.x,
                                  y: 0,
                                }}
                                onDrag={(e, data) => trackPos(data)}
                                axis="x">
                                <p style={{ cursor: "pointer", display: "inline-block" }} className='text-red-500 font-bold'>{chordValue.chordName}</p>
                              </Draggable>
                            }
                          </div>



                          <p></p>



                          <p className='font-semi-bold leading-3 text-gray-700'>{lineValue.lyric}</p>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>


                {/* Kalacak */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Satırı Kaydet
                  </button>

                  <button

                    className="rounded-md bg-indigo-600 ml-3 px-5 transition-all py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Önizle
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeDialog}
                    ref={cancelButtonRef}
                  >
                    İptal
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
