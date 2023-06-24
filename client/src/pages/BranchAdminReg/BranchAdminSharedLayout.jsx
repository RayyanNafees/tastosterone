import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import tasLogo from '../../assets/Logo.png'

import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'

import { UserDataContext } from '../../data/globalData'

const BranchAdminSharedLayout = () => {
  const [regData, setRegData] = useState({})
  const SideBar = () => {
    return (
      <aside className='reg-page-aside xs:hidden sm:inline sm:w-3/12 sm:h-[screen]'>
        <div className='reg-page-aside-transparent w-full h-screen px-2 py-3 flex flex-col justify-between'>
          <img src={tasLogo} className='xs:hidden sm:inline w-28' />
          <span className='font-inter text-white tracking-[-0.02rem] leading-7 flex flex-col gap-3 xs:row-start-1 xs:row-end-2 sm:row-start-3 sm:row-end-4'>
            <h2 className=' font-semibold text-[28px] text-left '>
              We’re #1 choice for managing your teaching business.
            </h2>
            <p className='text-lg font-normal'>
              Easily manage scheduling, students, billing and more!
            </p>
          </span>

          <footer className='xs:row-start-4 xs:row-end-5 sm:row-start-6 sm:row-end-7 text-white'>
            <span className='flex gap-2 '>
              <BsTwitter />
              <BsFacebook />
              <BsLinkedin />
            </span>

            <span className='flex gap-3 text-sm mt-6'>
              <p>Terms of service</p>
              <p>Privacy policy</p>
              <p>Help</p>
            </span>
          </footer>
        </div>
      </aside>
    )
  }

  return (
    <UserDataContext.Provider value={{ regData, setRegData }}>
      <div className='org-reg-body font-openSans '>
        <SideBar />
        <div className='overflow-hidden flex flex-col sm:w-9/12'>
          <Outlet />
        </div>
      </div>
    </UserDataContext.Provider>
  )
}

export default BranchAdminSharedLayout
