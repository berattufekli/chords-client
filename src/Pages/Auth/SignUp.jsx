import { AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import useForm from 'Hooks/useForm';
import { register } from 'Store/auth/authSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultFormState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordConfirm: "",
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const dispatch = useDispatch();

  const { form, handleChange } = useForm(defaultFormState);

  const handleSubmit = () => {
    dispatch(register(form)).then((params) => {
      try {
        if (params.payload.success) {
          toast.success('Hesabınız Oluşturuldu👌', {
            position: 'bottom-center',
            autoClose: 5000, // 3 saniye sonra otomatik olarak kapanacak
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        else{
          toast.error('Email Kullanılıyor 🤯', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.log(params.payload);
        toast.error('Hesabınız Oluşturulamadı 🤯', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Hesap Oluşturun
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-2">
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
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
                  type="text"
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
              <label htmlFor="password" className="text-sm font-medium leading-6">
                Şifre
              </label>
              <div className="mt-2 flex group items-center w-full">
                <LockClosedIcon className="h-4 w-4 z-10 text-gray-400 ml-2" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder='Şifrenizi giriniz'
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
              <label htmlFor="passwordConfirm" className="text-sm font-medium leading-6">
                Şifre Onay
              </label>
              <div className="mt-2 flex group items-center w-full">
                <LockClosedIcon className="h-4 w-4 z-10 text-gray-400 ml-2" aria-hidden="true" />
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  required
                  placeholder='Şifrenizi giriniz'
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
              <button
                onClick={handleSubmit}
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Hesap Oluştur
              </button>
            </div>

            <ToastContainer />

            <p className="mt-10 text-center text-sm text-gray-500">
              Hesabınız var mı?{' '}
              <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Giriş yapın
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}