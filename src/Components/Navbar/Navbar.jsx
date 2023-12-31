
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Logo from "assets/images/logo.svg";
import { useSelector } from 'react-redux';



export default function Navbar() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isss", isAuthenticated)

  return (
    <div as={"nav"} className='bg-indigo-700 shadow-sm'>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex h-14 items-center align- justify-between">

          <Link
            to={"/"}>
            <img
              className="block h-8 w-8"
              src={Logo}
              alt="akorflex.com"
            />
          </Link>

          <Link
            to={"/"}
            className="rounded-lg bg-transparent p-1 text-indigo-100 hover:text-white transition-all"
          >
            <HomeIcon className="h-8 w-8 text-indigo-100 hover:text-white transition-all" aria-hidden="true" />
          </Link>

          <Link
            to={isAuthenticated ? "/hesap" : "/login"}>
            <UserIcon className="h-8 w-8 text-indigo-100 hover:text-white transition-all" aria-hidden="true" />
          </Link>
        </div>
      </div>


    </div>
  )
}