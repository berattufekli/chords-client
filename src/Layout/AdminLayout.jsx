import AdminNavbar from 'Components/Navbar/AdminNavbar'
import AdminSidebar from 'Components/Sidebar/AdminSidebar'
import React from 'react'


function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full lg:w-5/6 ml-auto bg-gray-100">
        <AdminNavbar />
        {children}
      </div>
    </div>
  )
}

export default AdminLayout