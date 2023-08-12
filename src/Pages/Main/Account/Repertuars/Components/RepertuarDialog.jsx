import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import useForm from 'Hooks/useForm'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SelectStatus from './SelectStatus'
import { addList } from 'Store/main/listsSlice'
import { closeEditListDialog } from 'Store/main/listsSlice'
import { closeNewListDialog } from 'Store/main/listsSlice'
import { updateList } from 'Store/main/listsSlice'
import { toast } from 'react-toastify';

const defaultFormState = {
  listName: "",
}

const statusValues = [
  { id: "private", name: "Gizli" },
  { id: "public", name: "Herkese Açık" }
]

function NewList() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { listDialog } = useSelector((state) => state.lists);

  const [statusValue, setStatusValue] = useState({
    id: "private",
    name: "Gizli",
  });

  const { form, handleChange, setForm } = useForm(defaultFormState);

  const handleSubmit = () => {
    if (listDialog.type === "new") {
      let data = {
        ...form,
        type: statusValue.id,
        userId,
      }
      dispatch(addList(data))
        .then((params) => console.log(params.payload))
        .then(() => handleCloseDialog());
      setForm(defaultFormState);
    }
    else {
      let data = {
        ...form,
        type: statusValue.id,
        userId,
      }
      dispatch(updateList(data))
        .then((params) => {
          try {
            if (params.payload.success) {

              console.log("burada", params.payload);
              toast.success('Liste Güncellendi👌', {
                position: 'bottom-center',
                autoClose: 3000, // 3 saniye sonra otomatik olarak kapanacak
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          } catch (error) {
            toast.error('Liste Güncellenemedi', {
              position: 'bottom-center',
              autoClose: 3000, // 3 saniye sonra otomatik olarak kapanacak
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .then(() => handleCloseDialog());
      setForm(defaultFormState);
    }


  }


  useEffect(() => {
    if (listDialog.type === "edit") {
      setForm(listDialog.data);
      const status = statusValues.find((f) => f.id === listDialog.data.type);
      setStatusValue(status);
    }
    else {
      setForm(defaultFormState);
      setStatusValue({
        id: "private",
        name: "Gizli",
      });
    }
  }, [listDialog, setForm]);

  const handleCloseDialog = () => {
    dispatch(closeEditListDialog());
    dispatch(closeNewListDialog());

  }

  return (
    <div className=' space-y-2'>
      <form>
        <div className='grid mt-4 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
          <div>
            <label htmlFor="name" className="text-sm font-semibold leading-6">
              Liste Adı
            </label>
            <div className="mt-2 flex group items-center">
              <ClipboardDocumentListIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
              <input
                id="listName"
                name="listName"
                type="text"
                autoComplete="listName"
                value={form.listName}
                onChange={handleChange}
                required
                placeholder='Liste Adını giriniz'
                className="block pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <SelectStatus statusValue={statusValue} setStatusValue={setStatusValue} status={statusValues} />
          </div>
        </div>
      </form>

      <div className='flex gap-2 justify-end'>
        <button
          onClick={handleCloseDialog}
          className="flex my-4 justify-center items-center rounded-md bg-red-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Kapat
        </button>

        {
          listDialog.type === "new"
            ? <button
              onClick={handleSubmit}
              className="flex my-4 justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Listeyi Kaydet
            </button>
            :
            <button
              onClick={handleSubmit}
              className="flex my-4 justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Listeyi Güncelle
            </button>
        }

      </div>
    </div>
  )
}

export default NewList