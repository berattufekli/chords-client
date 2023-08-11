import useForm from 'Hooks/useForm';
import { updateSongNote } from 'Store/main/songNotesSlice';
import { removeSongNote } from 'Store/main/songNotesSlice';
import { addSongNote } from 'Store/main/songNotesSlice';
import { getSongs } from 'Store/main/songsSlice';
import { selectSongById } from 'Store/main/songsSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import MustLogin from '../MustLogin';

const defaultFormState = {
  _id: "",
  note: "",
}

function SpecialNote() {
  const dispatch = useDispatch();
  const { id } = useParams();


  const { settings } = useSelector((state) => state.applicationSlice);
  const { songNote } = useSelector((state) => selectSongById(state, id));
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  useEffect(() => {
    if (songNote !== undefined && songNote[0]) {
      setForm(songNote[0]);
    }
    else {
      setForm(defaultFormState);

    }
  }, [songNote, setForm])

  const handleSaveNote = () => {
    if (songNote.length === 0) {
      let data = {
        note: form.note,
        songId: id,
        userId,
      }
      dispatch(addSongNote(data))
        .then((params) => {
          if (params.payload.success) {
            dispatch(getSongs());
            toast.success('Özel Not Oluşturuldu👌', {
              position: 'bottom-center',
              autoClose: 3000, // 3 saniye sonra otomatik olarak kapanacak
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
    }
    else {
      let data = {
        ...form,
        songId: id,
        userId,
      }
      dispatch(updateSongNote(data))
        .then((params) => {
          if (params.payload.success) {
            dispatch(getSongs());
            toast.success('Özel Not Güncellendi', {
              position: 'bottom-center',
              autoClose: 3000, // 3 saniye sonra otomatik olarak kapanacak
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
    }
  }

  const handleRemoveNote = () => {
    if (songNote.length === 1) {
      dispatch(removeSongNote(form))
        .then((params) => {
          if (params.payload.success) {
            dispatch(getSongs());
            toast.success('Özel Not Silindi', {
              position: 'bottom-center',
              autoClose: 3000, // 3 saniye sonra otomatik olarak kapanacak
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
    }
  }

  if (settings.showSpecialNote) {
    if (!isAuthenticated) {
      return <MustLogin title={"Özel not"}/>
    }

    return (
      <div className='m-2 flex flex-col'>
        <div >
          <textarea
            id="note"
            name="note"
            type="text"
            autoComplete="note"
            value={form.note}
            onChange={handleChange}
            required
            rows={4}
            placeholder='Notunuzu giriniz'
            className="block resize-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className='grid sm:grid-cols-8 grid-cols-2 gap-2'>
          {
            songNote.length === 1 && <button onClick={handleRemoveNote} className="rounded-md  my-2 px-3 h-8 bg-red-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sil
            </button>
          }
          <button onClick={handleSaveNote} className="rounded-md my-2 px-3 h-8 bg-indigo-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Kaydet
          </button>
        </div>
      </div>
    )
  }

  return null;
}

export default SpecialNote