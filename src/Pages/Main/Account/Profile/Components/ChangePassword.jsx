import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import useForm from 'Hooks/useForm'
import React, { useState } from 'react'

const defaultFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const { form, handleChange } = useForm(defaultFormState);


  return (
    <div className='bg-white rounded-lg shadow-lg px-4 space-y-2'>
      <p className='font-bold py-2 mt-2  text-gray-700 text-lg'>Şifreyi Değiştir</p>

      <div>
        <label htmlFor="password" className="text-sm font-medium leading-6">
          Mevcut Şifre
        </label>
        <div className="mt-2 flex group items-center w-full">
          <LockClosedIcon className="h-4 w-4 z-10 text-gray-400 ml-2" aria-hidden="true" />
          <input
            id="currentPassword"
            name="currentPassword"
            type={"password"}
            value={form.currentPassword}
            autoComplete="nope"
            onChange={handleChange}
            required
            placeholder='Mevcut şifrenizi giriniz'
            className="block -mx-6 pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {
            showPassword
              ? <EyeIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
              : <EyeSlashIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
          }
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium leading-6">
          Yeni Şifre
        </label>
        <div className="mt-2 flex group items-center w-full">
          <LockClosedIcon className="h-4 w-4 z-10 text-gray-400 ml-2" aria-hidden="true" />
          <input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={form.newPassword}
            autoComplete="off" // Disable auto-completion for newPassword field
            spellCheck="false"
            onChange={handleChange}
            required
            placeholder='Yeni şifrenizi giriniz'
            className="block -mx-6 pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {
            showPassword
              ? <EyeIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
              : <EyeSlashIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
          }
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium leading-6">
          Yeni Şifre Onay
        </label>
        <div className="mt-2 flex group items-center w-full">
          <LockClosedIcon className="h-4 w-4 z-10 text-gray-400 ml-2" aria-hidden="true" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="off" // Disable auto-completion for confirmPassword field
            spellCheck="false"
            required
            placeholder='Yeni şifreyi tekrar giriniz'
            className="block -mx-6 pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {
            showPassword
              ? <EyeIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
              : <EyeSlashIcon onClick={handleShowPassword} className="h-4 w-4 cursor-pointer text-gray-400 left-0" aria-hidden="true" />
          }
        </div>
      </div>


      <div className='flex justify-end'>
        <button
          className="flex my-4 justify-center items-center rounded-md bg-indigo-600 px-7 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  )
}

export default ChangePassword;
