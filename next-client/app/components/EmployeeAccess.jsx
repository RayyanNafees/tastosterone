import React from 'react'
import ToggleSwitch from './Switch'
import { accesses } from '../data/EmployeeAccesses'
import SaveGroupBtn from './SaveGroupBtn'

const EmployeeAccess = ({ showSaveBtn }) => {
  //showSaveBtn prop will make it show the save buttons where needed
  return (
    <div>
      <header className='flex flex-col gap-1 mt-5'>
        <h2 className='class-page-subheading mb-0'>
          Add access and permissions
        </h2>
        <p className='class-paragraph'>
          Toggle the permission you will like to give to employee. Permission
          settings will be displayed depending on whether the employee is a
          tutor or staff. These settings allow you to control which functions
          the employee will be able to access from their user account.
        </p>
      </header>

      <main className='mt-8 flex flex-col gap-5'>
        {accesses.map((access) => {
          const { id, header, decsr, view, manage } = access
          return (
            <div
              className='flex xs:flex-col md:flex-row justify-between px-2 border-b'
              key={id}
            >
              <div>
                <h1 className='class-page-subheading mb-1'>{header}</h1>
                <p className='class-paragraph text-sm mb-1 w-[90%]'>{decsr}</p>
              </div>
              <aside className='flex xs:py-3 md:py-0'>
                <span className='mr-8 flex flex-col gap-3'>
                  <ToggleSwitch />
                  <footer>View</footer>
                </span>
                <span className='mr-8 flex flex-col gap-3'>
                  <ToggleSwitch />
                  <footer>Manage</footer>
                </span>
              </aside>
            </div>
          )
        })}
      </main>

      {/* {showSaveBtn && <SaveGroupBtn />} */}
    </div>
  )
}

// EmployeeAccess.defaultProps = {
//   showSaveBtn: true,
// }

export default EmployeeAccess
