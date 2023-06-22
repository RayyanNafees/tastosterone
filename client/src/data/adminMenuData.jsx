import { Link } from 'react-router-dom'

import { RxDashboard, RxCaretRight } from 'react-icons/rx'
import { TbBook } from 'react-icons/tb'
import { SlGraduation } from 'react-icons/sl'
import { FiUsers, FiSettings } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'
import { BsGraphUp, BsChatDots } from 'react-icons/bs'
import { HiOutlineDocumentReport } from 'react-icons/hi'

const style = { fontWeight: 'bold', fontSize: '1rem' }

export const MenuItems = [
  {
    id: 0,
    title: 'Dashboard',
    icon: [<RxDashboard style={style} />],
    url: '/master-admin',
    refName: 'dashboard',
  },
  {
    id: 1,
    title: 'Classes',
    icon: [<TbBook style={style} />],
    url: '/master-admin/classes',
    refName: 'class',
  },
  {
    id: 2,
    title: 'Student and Family',
    icon: [<SlGraduation style={style} />],
    url: '/master-admin/all-families',
    refName: 'student',
  },
  {
    id: 3,
    title: 'Employee',
    icon: [<FiUsers style={style} />],
    url: '/master-admin/all-employees',
    refName: 'employee',
  },
  {
    id: 4,
    title: 'Calender',
    icon: [<SlCalender style={style} />],
    url: '/master-admin/scheduled-lessons',
    refName: 'calender',
  },
  {
    id: 5,
    title: 'Emails',
    icon: [<BsChatDots style={style} />],
    url: '/master-admin',
    refName: 'emails',
  },
  {
    id: 6,
    title: 'Billing',
    icon: [<BsGraphUp style={style} />],
    url: '/master-admin',
    refName: 'billing',
  },
  {
    id: 7,
    title: 'Reports',
    icon: [<HiOutlineDocumentReport style={style} />],
    url: '/master-admin',
    refName: 'reports',
  },
  {
    id: 8,
    title: 'Account and Settings',
    icon: [<FiSettings style={style} />],
    url: '/master-admin',
    refName: 'setting',
  },
]

// this component will be displayed dynamically and it shows based on logic
export const SubMenu = ({ data }) => {
  const { items, url } = data
  console.log(items, url)
  return (
    <footer className='flex flex-col bg-submenu mt-0 text-md font-medium p-2'>
      {items.map((sub) => {
        return (
          <span className='flex items-center'>
            <RxCaretRight />
            <Link to={url[items.indexOf(sub)]}>
              <p>{sub}</p>
            </Link>
          </span>
        )
      })}
    </footer>
  )
}
