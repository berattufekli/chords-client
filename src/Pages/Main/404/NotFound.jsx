import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sayfa bulunamadı</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Üzgünüz, aradığınız sayfayı bulamadık.</p>
        <div className="mt-10 grid grid-cols-2 gap-2">
          <Link
            to={"/"}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ana Sayfaya Dön
          </Link>


          <Link
            to={"/iletisim"}
            className="text-sm font-semibold px-3.5 py-2.5 border-2 border-indigo-600  rounded-md text-gray-900"
          >
            İletişime Geç <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main >
  )
}

export default NotFound