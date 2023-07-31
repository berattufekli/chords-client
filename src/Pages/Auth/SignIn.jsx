import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import useForm from 'Hooks/useForm'
import { login } from 'Store/auth/authSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const defaultFormState = {
  email: "",
  password: "",
}


export default function SingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, handleChange } = useForm(defaultFormState);

  const handleSubmit = () => {
    dispatch(login(form)).then((params) => {
      if(params.payload.success){
        navigate("/");
      }
    })
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hesabınıza Giriş Yapın
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-4">

            <div>
              <label htmlFor="email" className="text-sm font-medium leading-6">
                Email
              </label>
              <div className="mt-2 flex items-center">
                <AtSymbolIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder='Emailinizi giriniz'
                  className="block pl-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Şifre
                </label>
                <div className="text-sm">
                  <a href='#' className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Şifrenizi mi unuttunuz?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <LockClosedIcon className="h-4 w-4 absolute text-gray-400 ml-2" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder='Şifrenizi giriniz'
                  className="block w-full pl-8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Giriş Yap
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Hesabınız yok mu?{' '}
            <Link to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Hesap Oluşturun
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}