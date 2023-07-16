import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from 'Hooks/useForm';
import { closeEditSongDialog } from 'Store/main/songsSlice';
import { closeNewSongDialog } from 'Store/main/songsSlice';
import { addSong } from 'Store/main/songsSlice';
import { updateSong } from 'Store/main/songsSlice';
import SelectArtist from './Components/SelectArtist';
import { selectArtists } from 'Store/main/artistsSlice';

const defaultFormState = {
  songId: 0,
  songName: "",
  songAlbum: "",
  songLyrics: "",
  artistId: 0,
  url: "",
};

export default function SongDialog() {
  const dispatch = useDispatch();

  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const artists = useSelector(selectArtists);
  const [artistValue, setArtistValue] = useState(false);

  const songDialog = useSelector(
    ({ songs }) => songs.songDialog
  );
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (songDialog.type === "edit" && songDialog.data) {
      setForm({ ...songDialog.data });

      console.log(songDialog.data);
      const artist = artists.find(
        (f) => f.artistId === songDialog.data.artistInfo.artistId
      );
      console.log(artist);
      setArtistValue(artist);
    }

    /**
     * Dialog type: 'new'
     */
    if (songDialog.type === "new") {
      setForm({
        ...defaultFormState,
        ...songDialog.data,
      });

    }
  }, [songDialog.data, songDialog.type, setForm]);


  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (songDialog.props.open) {
      initDialog();
    }
  }, [songDialog.props.open, initDialog]);


  const cancelButtonRef = useRef(null)

  function closeDialog() {
    setArtistValue(false);
    return songDialog.type === "edit"
      ? dispatch(closeEditSongDialog())
      : dispatch(closeNewSongDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();





    if (songDialog.type === "new") {

      let data = {
        ...form,
        status: "active",
        artistId: artistValue.id,
        lyricsData: form.songLyrics.split("\n"),
      };
      setArtistValue(false);
      dispatch(addSong(data));
    } else {

      let data = {
        ...form,
        status: "active",
        artistId: artistValue.id,
        lyricsData: form.songLyrics.split("\n"),
      };
      setArtistValue(false);
      console.log(data);
      dispatch(updateSong(data));
    }
    closeDialog();
  }

  return (
    <Transition.Root show={songDialog.props.open} as={Fragment}>
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
                  <h2 className="text-xl bg-gray-50 shadow-md font-bold leading-7 p-4 text-gray-900">Sanatçı Bilgileri</h2>

                  <div className="grid grid-cols-1 gap-y-2 my-2 px-4 sm:grid-cols-6 max-h-screen overflow-scroll">
                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Song ID
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="number"
                            name="songId"
                            id="songId"
                            value={form.songId}
                            onChange={handleChange}
                            disabled
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <SelectArtist artistValue={artistValue} setArtistValue={setArtistValue} artists={artists} />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Şarkı Adı
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="songName"
                            id="songName"
                            value={form.songName}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Şarkı Adı Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Albüm Adı
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="songAlbum"
                            id="songAlbum"
                            value={form.songAlbum}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Albüm Adı Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Şarkı Sözleri
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <textarea
                            type="text"
                            name="songLyrics"
                            id="songLyrics"
                            rows={5}
                            style={{ resize: "none" }}
                            value={form.songLyrics}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Şarkı Sözleri Giriniz"
                          />
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
                    Kaydet
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
