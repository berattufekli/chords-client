import React from 'react'
import { Link } from 'react-router-dom'

function MustLogin() {
  return (
    <div className='m-2 flex flex-col'>
      <p className='text-gray-600 font-semibold'>Özel not kaydedebilmek için giriş yapmanız gerekmektedir</p>

      <div>
        <Link to={"/login"}>
          <button
            className="flex justify-center items-center rounded-md bg-indigo-600 px-3 py-1 my-2 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Giriş Yap
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MustLogin