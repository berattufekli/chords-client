import React, { useState } from 'react'
import Tabs from './Components/Tabs'
import ProfileTab from './Profile/ProfileTab';
import RepertuarsTab from './Repertuars/RepertuarsTab';
import SettingsTab from './Settings/SettingsTab';

function AccountDashboard() {

  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = (index) => {
    setActiveTab(index);
  }

  const getActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab />
      case 1:
        return <RepertuarsTab />
      case 2:
        return <SettingsTab />
      default:
        return <ProfileTab />
    }
  }

  return (
    <div className='flex flex-col max-w-3xl my-10 m-auto'>
      <Tabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
      <div className='my-5 mx-2 xl:mx-0' >
        {
          getActiveTab()
        }
      </div>
    </div>
  )
}

export default AccountDashboard