import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from 'Hooks/useForm';
import { closeEditChordDialog } from 'Store/main/chordsSlice';
import { closeNewChordDialog } from 'Store/main/chordsSlice';
import { addChord } from 'Store/main/chordsSlice';
import { updateChord } from 'Store/main/chordsSlice';
import SelectSong from './Components/SelectSong';
import { selectSongs } from 'Store/main/songsSlice';
import * as Transposer from 'chord-transposer';
import ToneValues from 'Pages/Main/Songs/Components/ToneValues';

const defaultFormState = {
  chordId: 0,
  chordNo: "",
  chordName: "",
  C_tone: "",
  C_sharp_tone: "",
  Db_tone: "",
  D_tone: "",
  D_sharp_tone: "",
  Eb_tone: "",
  E_tone: "",
  F_tone: "",
  F_sharp_tone: "",
  Gb_tone: "",
  G_tone: "",
  G_sharp_tone: "",
  Ab_tone: "",
  A_tone: "",
  A_sharp_tone: "",
  Bb_tone: "",
  B_tone: "",
  status: "active"
};

export default function ChordsDialog() {


  const dispatch = useDispatch();

  const songs = useSelector(selectSongs);
  const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);

  const [songValue, setSongValue] = useState(false);
  const chordDialog = useSelector(
    ({ chords }) => chords.chordDialog
  );
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (chordDialog.type === "edit" && chordDialog.data) {
      setForm({ ...chordDialog.data });

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
    return chordDialog.type === "edit"
      ? dispatch(closeEditChordDialog())
      : dispatch(closeNewChordDialog());
  }

  function handleTranspose(event) {
    event.preventDefault();
    ToneValues.map((tone) => {
      setInForm(tone.key, Transposer.transpose(form.chordName).toKey(tone.name).toString().replace(/\s{2,}/g, " "));
      console.log(Transposer.transpose(form.chordName).toKey(tone.name).toString());
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    form.chordName.split(" ").map((item, key) => {
      const data = {
        songId: songValue.id,
        chordNo: key + 1,
        chordName: item,
        C_tone: form.C_tone.split(" ")[key],
        C_sharp_tone: form.C_sharp_tone.split(" ")[key],
        Db_tone: form.Db_tone.split(" ")[key],
        D_tone: form.D_tone.split(" ")[key],
        D_sharp_tone: form.D_sharp_tone.split(" ")[key],
        Eb_tone: form.Eb_tone.split(" ")[key],
        E_tone: form.E_tone.split(" ")[key],
        F_tone: form.F_tone.split(" ")[key],
        F_sharp_tone: form.F_sharp_tone.split(" ")[key],
        Gb_tone: form.Gb_tone.split(" ")[key],
        G_tone: form.G_tone.split(" ")[key],
        G_sharp_tone: form.G_sharp_tone.split(" ")[key],
        Ab_tone: form.Ab_tone.split(" ")[key],
        A_tone: form.A_tone.split(" ")[key],
        A_sharp_tone: form.A_sharp_tone.split(" ")[key],
        Bb_tone: form.Bb_tone.split(" ")[key],
        B_tone: form.B_tone.split(" ")[key],
        status: "active"
      };

      console.log(data);
      dispatch(addChord(data));
    })

    // if (chordDialog.type === "new") {
    //   let data = {
    //     ...form,
    //     status: "active",
    //     songId: songValue.id,
    //   };
    //   dispatch(addChord(data));
    // } else {
    //   let data = {
    //     ...form,
    //     status: "active",
    //     songId: songValue.id,
    //   };
    //   dispatch(updateChord(data));
    // }
    // closeDialog();
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
                  <h2 className="text-xl bg-gray-50 shadow-md font-bold leading-7 p-4 text-gray-900">
                    Akor Bilgileri
                  </h2>

                  <div className="grid grid-cols-1 gap-y-2 my-2 px-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Akor ID
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="number"
                            name="artistId"
                            id="artistId"
                            value={form.chordId}
                            onChange={handleChange}
                            disabled
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sanatçı Adınız Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <SelectSong songValue={songValue} setSongValue={setSongValue} songs={songs} />
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Akor No
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="chordNo"
                            id="chordNo"
                            value={form.chordNo}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Akor No Giriniz"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                        Akor Adı
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            type="text"
                            name="chordName"
                            id="chordName"
                            value={form.chordName}
                            onChange={handleChange}
                            className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Akor Adı Giriniz"
                          />
                        </div>
                      </div>
                    </div>


                    <div className="col-span-full">
                      <div className='grid sm:grid-cols-5 grid-cols-2 space-x-2'>
                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            C Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="C_tone"
                                id="C_tone"
                                value={form.C_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="C Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            C# Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="C_sharp_tone"
                                id="C_sharp_tone"
                                value={form.C_sharp_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="C# Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            Db Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="Db_tone"
                                id="Db_tone"
                                value={form.Db_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Db Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            D Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="D_tone"
                                id="D_tone"
                                value={form.D_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="D Tone Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            D# Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="D_sharp_tone"
                                id="D_sharp_tone"
                                value={form.D_sharp_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="D# Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>



                      </div>
                    </div>

                    <div className="col-span-full">
                      <div className='grid sm:grid-cols-6 grid-cols-2 space-x-2'>
                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            Eb Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="Eb_tone"
                                id="Eb_tone"
                                value={form.Eb_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Eb Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            E Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="E_tone"
                                id="E_tone"
                                value={form.E_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="E Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            F Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="F_tone"
                                id="F_tone"
                                value={form.F_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="F Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            F# Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="F_sharp_tone"
                                id="F_sharp_tone"
                                value={form.F_sharp_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="F# Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            Gb Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="Gb_tone"
                                id="Gb_tone"
                                value={form.Gb_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Gb Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            G Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="G_tone"
                                id="G_tone"
                                value={form.G_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="G Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>



                      </div>
                    </div>

                    <div className="col-span-full">
                      <div className='grid sm:grid-cols-6 grid-cols-2 space-x-2'>
                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            G# Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="G_sharp_tone"
                                id="G_sharp_tone"
                                value={form.G_sharp_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="G# Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>



                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            Ab Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="Ab_tone"
                                id="Ab_tone"
                                value={form.Ab_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Ab Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            A Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="A_tone"
                                id="A_tone"
                                value={form.A_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="A Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm leading-6 text-gray-900">
                            A# Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="A_sharp_tone"
                                id="A_sharp_tone"
                                value={form.A_sharp_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="A# Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            Bb Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="Bb_tone"
                                id="Bb_tone"
                                value={form.Bb_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Bb Tonu Gir"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font- leading-6 text-gray-900">
                            B Tonu
                          </label>
                          <div className="mt-1">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                              <input
                                type="text"
                                name="B_tone"
                                id="B_tone"
                                value={form.B_tone}
                                onChange={handleChange}
                                className="block flex-1 border-0 m-1 ml-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="B Tonu Gir"
                              />
                            </div>
                          </div>
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
                    onClick={handleTranspose}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"

                  >
                    Transpoze Et
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
