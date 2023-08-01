import { logout } from 'Store/auth/authSlice';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    })
  }

  return (
    <div className='bg-white p-4 flex justify-between items-center rounded-lg shadow-lg '>
      <p className='font-bold  text-gray-700 text-lg'>Çıkış Yap</p>

      <button
        onClick={handleLogout}
        className="flex justify-center items-center rounded-md bg-red-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-md transition-all hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Çıkış Yap
      </button>
    </div>
  )
}

export default Logout