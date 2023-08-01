import { AtSymbolIcon, UserIcon } from '@heroicons/react/24/outline'
import useForm from 'Hooks/useForm'
import { loadUser } from 'Store/auth/authSlice'
import { updateUserInformation } from 'Store/auth/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const defaultFormState = {
  userId: "",
  name: "",
  surname: "",
  email: "",
}

function ChangeUserInformation() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { form, handleChange, setForm } = useForm(defaultFormState);

  useEffect(() => {
    setForm(auth);
  }, [auth, setForm]);

  const handleSubmit = () => {
    dispatch(updateUserInformation(form));
  }

  return (
    <div className='bg-white rounded-lg shadow-lg px-4 space-y-2'>
      <p className='font-bold py-2 mt-2  text-gray-700 text-lg'>Kullanıcı Bilgileri</p>
      <form>
        <div className='grid mt-4 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
          <div>
            <label htmlFor="name" className="text-sm font-medium leading-6">
              Adınız
            </label>
            <div className="mt-2 flex group items-center">
              <UserIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder='Adınızı giriniz'
                className="block pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="surname" className="text-sm font-medium leading-6">
              Soyadınız
            </label>
            <div className="mt-2 flex group items-center">
              <UserIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
              <input
                id="surname"
                name="surname"
                type="text"
                autoComplete="surname"
                value={form.surname}
                onChange={handleChange}
                required
                placeholder='Soyadınızı giriniz'
                className="block pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium leading-6">
            Email
          </label>
          <div className="mt-2 flex group items-center">
            <AtSymbolIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              spellCheck="false"
              autoCorrect='off'
              value={form.email}
              onChange={handleChange}
              required
              placeholder='Emailinizi giriniz'
              className="block pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>

      <div className='flex justify-end'>
        <button
          onClick={handleSubmit}
          className="flex my-4 justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Bilgileri Güncelle
        </button>
      </div>
    </div>
  )
}

export default ChangeUserInformation