import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineClose } from 'react-icons/md'
import { ToggleContext } from '../../data/globalData'

const TopBar = () => {
  const { toggle, setToggle } = React.useContext(ToggleContext)
  return (
    <div className='w-screen lg:w-[calc(100vw-15.5rem)] bg-white lg:absolute lg:right-0 shadow-summaryBox'>
      <nav className=' flex justify-between items-center px-2 h-[3.13rem]'>
        <img src='/Logo.png' alt='TAS LOGO' className='lg:hidden w-[5em] h-9' />
        <span className='lg:hidden' onClick={() => setToggle(!toggle)}>
          {!toggle ? <AiOutlineMenu /> : <MdOutlineClose />}
        </span>
      </nav>
    </div>
  )
}

export default TopBar
