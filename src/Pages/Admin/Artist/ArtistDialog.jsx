import { Fragment, useCallback, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { closeEditArtistDialog } from 'Store/main/artistsSlice';
import { closeNewArtistDialog } from 'Store/main/artistsSlice';
import useForm from 'Hooks/useForm';
import { addArtist } from 'Store/main/artistsSlice';
import { updateArtist } from 'Store/main/artistsSlice';
import { nanoid } from '@reduxjs/toolkit';

const defaultFormState = {
  artistId: "",
  artistName: "",
  artistDescription: "",
  url: "",
};

export default function ArtistDialog() {
  const dispatch = useDispatch();

  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const artistDialog = useSelector(
    ({ artists }) => artists.artistDialog
  );
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (artistDialog.type === "edit" && artistDialog.data) {
      setForm({ ...artistDialog.data });

    }

    /**
     * Dialog type: 'new'
     */
    if (artistDialog.type === "new") {
      setForm({
        ...defaultFormState,
        ...artistDialog.data,
      });

    }
  }, [artistDialog.data, artistDialog.type, setForm]);


  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (artistDialog.props.open) {
      initDialog();
    }
  }, [artistDialog.props.open, initDialog]);


  const cancelButtonRef = useRef(null)

  function closeDialog() {
    return artistDialog.type === "edit"
      ? dispatch(closeEditArtistDialog())
      : dispatch(closeNewArtistDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(form);

    if (artistDialog.type === "new") {
      let data = {
        ...form,
        id: null,
        status: "active",
      };
      dispatch(addArtist(data));
    } else {
      let data = {
        ...form,
        status: "active",
      };
      dispatch(updateArtist(data));
    }
    closeDialog();
  }

  return (
    <Transition.Root show={artistDialog.props.open} as={Fragment}>
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

                  <div className="grid grid-cols-1 gap-y-2 my-2 px-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Sanatçı ID
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="artistId"
                            id="artistId"
                            value={form.artistId}
                            onChange={handleChange}
                            disabled
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Sanatçı Adı
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="artistName"
                            id="artistName"
                            value={form.artistName}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sanatçı Adını Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Sanatçı Açıklaması
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="artistDescription"
                            id="artistDescription"
                            value={form.artistDescription}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sanatçı Açıklamasını Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Fotoğraf URL'si
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="url"
                            id="url"
                            value={form.url}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sanatçı Fotoğraf URL'si Giriniz"
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
