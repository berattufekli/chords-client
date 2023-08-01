import React from 'react'
import ChangeUserInformation from './Components/ChangeUserInformation'
import ChangePassword from './Components/ChangePassword'
import Logout from './Components/Logout'

function ProfileTab() {
  return (
    <div className='flex flex-col space-y-4'>
      <ChangeUserInformation />
      <ChangePassword />
      <Logout />
    </div>
  )
}

export default ProfileTab