import React, { useState, useEffect } from 'react'
import { Link } from 'next/link'

import tasLogo from '../../assets/Logo.png'
import { RxCaretRight, RxCaretDown } from 'react-icons/rx'

import { MenuItems, SubMenu } from '../../data/adminMenuData'

import { ToggleContext } from '../../data/globalData'

const Navbar = () => {
  const [navRef, setNavRef] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const { toggle, setToggle } = React.useContext(ToggleContext)

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const checkInnerWidth = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', checkInnerWidth)
    return () => {
      window.removeEventListener('resize', checkInnerWidth)
    }
  })

  const handleSubMenu = (id) => {
    // this gets the ref hook of the current component
    const newNavRef = navRef.map((nav) => false)
    newNavRef[id] = true
    setNavRef(newNavRef)
  }

  const subMenu = {
    dashboard: { items: [], url: [] },
    class: {
      items: ['All classes', 'Add new classes'],
      url: ['classes', 'add-class'],
    },
    student: {
      items: [
        'All Students',
        // 'Add New Student',
        'All Families',
        'Enroll',
      ],
      // url: ['all-students', 'add-student', 'all-families', 'add-family'],
      url: ['all-students', 'all-families', 'enroll'],
    },
    employee: {
      items: ['All Employees', 'Add New Employee'],
      url: ['all-employees', 'add-employee'],
    },
    calender: {
      items: ['Sheduled Lessons', 'Shedule New Lessons'],
      url: ['scheduled-lessons', 'schedule-new-lesson'],
    },
    emails: {
      items: [
        'Compose email',
        'Sent email',
        'Outbox',
        'Notification templates',
      ],
      url: ['', ''],
    },
    billing: {
      items: [
        'All Invoices',
        'Create New Invoice',
        'All Transactions',
        'Add Transactions',
      ],
      url: ['', '', '', ''],
    },
    reports: {
      items: ['Overview', 'Finance'],
      url: ['', '', '', ''],
    },
    setting: {
      items: [
        'Organization Profile',
        'Settings',
        'Sessions',
        'Subscription',
        'Administrator',
      ],
      url: ['', '', '', '', ''],
    },
  }

  if (subMenu.dashboard.items.length) {
    console.log('dashboard', true)
  } else {
    console.log(false)
  }

  let nav_toggle_style =
    'hidden lg:inline-block absolute w-[15.06rem] bg-white h-screen shadow-navbar'

  if (innerWidth < 1200)
    nav_toggle_style = toggle
      ? 'absolute z-50 right-0 w-[15.06rem] bg-white h-fit shadow-navbar'
      : 'hidden'

  return (
    <div className={nav_toggle_style}>
      <header className='hidden lg:inline-block p-3 text-[#4B5563] text-sm font-semibold leading-9 border-b'>
        <img src={tasLogo} alt='TAS LOGO' />
        <h1>Adminstrator Dashboard</h1>
      </header>

      <nav className='flex flex-col gap-0 px-3 mt-5 '>
        {MenuItems.map((item) => {
          const { id, title, icon, url, refName } = item

          return (
            <div className='flex flex-col gap-0'>
              <Link to={url}>
                <span className='flex flex-row items-center justify-between gap-1 text-[#4B5563] h-12 w-full'>
                  <span className='flex gap-1 items-center'>
                    {icon}
                    <p className='font-semibold '>{title}</p>
                  </span>
                  <span
                    onClick={() => {
                      // this code checks if the menu has subMenu. If it doesn't then it's gonna disable the handleSubMenu function from running
                      Object.keys(subMenu).indexOf(title.toLowerCase()) &&
                        handleSubMenu(id)
                    }}
                  >
                    {!navRef[id] ? (
                      <RxCaretRight style={{ fontSize: '1.3rem' }} />
                    ) : (
                      <RxCaretDown style={{ fontSize: '1.3rem' }} />
                    )}
                  </span>
                </span>
              </Link>
              {navRef[id] && <SubMenu data={subMenu[refName]} />}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Navbar
