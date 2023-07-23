import React from 'react'
import { CubeTransparentIcon, MusicalNoteIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from 'react-router-dom'
import Logo from "assets/images/logo.svg"

function AdminSidebar() {
  const location = useLocation()
  return (
    <div className="w-2/6 lg:w-1/6 h-screen bg-indigo-700 fixed top-0 left-0 hidden lg:block">
      <div className="p-4">
        <Link to={"/"}>
          <img
            className="block h-10 w-auto px-4 mb-8"
            src={Logo}
            alt="Your Company"
          />
        </Link>
        <div className="flex flex-col">
          <Link to={"/sanatcilar"} className={location.pathname.includes("/sanatcilar") === true ? "flex  text-gray-200 font-semibold bg-indigo-800 transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left" : "flex  text-gray-200 font-semibold bg-transparent transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left"}>
            <UserIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Sanatçılar
          </Link>
          <Link to={"/sarkilar"} className={location.pathname.includes("/sarkilar") === true ? "flex  text-gray-200 font-semibold bg-indigo-800 transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left" : "flex  text-gray-200 font-semibold bg-transparent transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left"}>
            <MusicalNoteIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Şarkılar
          </Link>
          <Link to={"/akorlar"} className={location.pathname.includes("/akorlar") === true ? "flex  text-gray-200 font-semibold bg-indigo-800 transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left" : "flex  text-gray-200 font-semibold bg-transparent transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left"}>
            <CubeTransparentIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Akor
          </Link>
          <Link to={"/sarki-akorlari"} className={location.pathname.includes("/sarki-akorlari") === true ? "flex  text-gray-200 font-semibold bg-indigo-800 transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left" : "flex  text-gray-200 font-semibold bg-transparent transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left"}>
            <CubeTransparentIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Şarkı Akorları
          </Link>
          <Link to={"/kullanicilar"} className={location.pathname.includes("/kullanicilar") === true ? "flex  text-gray-200 font-semibold bg-indigo-800 transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left" : "flex  text-gray-200 font-semibold bg-transparent transition-all hover:bg-indigo-800 hover:text-white rounded-md py-2 px-4 mb-2 text-left"}>
            <UsersIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Kullanıcılar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar