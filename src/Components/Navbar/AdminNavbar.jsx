
import { EnvelopeIcon, ArrowRightOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function AdminNavbar() {

  return (
    <div as={"nav"} className="bg-white drop-shadow-md py-2">
      <div className="mx-auto w-full px-4">
        <div className="flex h-14 items-center sm:justify-between justify-end">

          <div className="sm:flex hidden rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:items-center">
            <span>
              <MagnifyingGlassIcon className='ml-2 w-5 h-5 text-gray-500'/>
            </span>
            <input
              type="text"
              name="artistDescription"
              id="artistDescription"

              className="block flex-1 border-0 m-1 ml-1 bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Search"
            >
            </input>
          </div>



          {/* Sağdaki Button */}
          <div className="flex items-center space-x-4 justify-center">
            <div >
              <p className="text-gray-500 text-sm font-bold">Hüseyin Berat Tüfekli</p>
              <p className='text-right text-xs font-semibold text-gray-400'>Admin</p>
            </div>
            <img className='w-12 h-12 rounded-lg' src={"https://yt3.googleusercontent.com/2NrF3qN2o7lCmOr9Q0xSvX9taGoPMRDK0B8QZsFblxJsjGpttvfdyVwYhzisyBY7PPW4IWxF9A=s900-c-k-c0x00ffffff-no-rj"} />

            <div className='w-1 rounded-lg h-8 bg-gray-300'></div>
            <button
              type="button"
              className="rounded-full bg-transparent p-1 text-indigo-100 hover:text-white transition-all"
            >
              <EnvelopeIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="rounded-full bg-transparent p-1 text-indigo-100 hover:text-white transition-all"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}