
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Logo from "assets/images/logo.svg";



export default function Navbar() {
  return (
    <div as={"nav"} className='bg-indigo-700'>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex h-14 items-center justify-between">

          <div className="flex items-center justify-center">

            <img
              className="block h-8 w-auto"
              src={Logo}
              alt="Your Company"
            />

          </div>

          <div className="flex items-center justify-center">
            <Link
              to={"/"}
              className="rounded-lg bg-transparent p-1 bg-indigo-800 text-indigo-100 hover:text-white transition-all"
            >
              <p className='font-bold  text-sm'>Popüler Akorlar</p>
            </Link>

            


          </div>

          {/* Sağdaki Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="rounded-full bg-transparent p-1 text-indigo-100 hover:text-white transition-all"
            >
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}