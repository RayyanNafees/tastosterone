import React from 'react'
import { MdCancel } from 'react-icons/md'
import { BiCalendar } from 'react-icons/bi'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import Badge from '../../../components/Badge'

const ScheduledLessons = () => {
  const weekdays = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']

  // modal style starts
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
  }

  // modal style ends

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // modal component starts here

  function BasicModal() {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labeledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style} className='p-2 w-[43.75rem] overflow-y-auto '>
            <header className='flex items-center py-[30px] pr-[10px] pl-[30px] justify-between'>
              <span className='class-page-subheading border mb-0'>
                Chemistry Class{' '}
                <span className='class-paragraph'>(Private class) </span>
              </span>

              <Badge status='completed' />
            </header>

            <section className='border'>
              <div className='border border-red-600'>
                <span></span>
              </div>
            </section>
          </Box>
        </Modal>
      </div>
    )
  }

  // ends here

  return (
    <div>
      <header>
        <h2 className='class-page-subheading mb-1'>Scheduled Lessons</h2>
        <footer className='class-paragraph text-sm'>
          With the schedule, you can tract the lesson a student or tuor has
          completed or yet to be taught.
        </footer>
      </header>

      <section className='flex gap-1 flex-wrap'>
        <div className='mt-5 '>
          <span className='flex flex-col '>
            <label className='class-page-subheading text-lg mb-1'>
              Select student
            </label>
            <input
              type='text'
              placeholder='search student'
              className='p-3 mb-5 w-[18rem] border border-[#9CA3AF] rounded-md'
            />
          </span>
          <section className='flex gap-3 flex-wrap md:w-[20rem] '>
            <span className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'>
              <p className='text-base'>James Fisher</p>
              <MdCancel />
            </span>
          </section>
        </div>
        <div className='mt-5 '>
          <span className='flex flex-col '>
            <label className='class-page-subheading text-lg mb-1'>
              Select tutor
            </label>
            <input
              type='text'
              placeholder='search tutor'
              className='p-3 mb-5 w-[18rem] border border-[#9CA3AF] rounded-md'
            />
          </span>
          <section className='flex gap-3 flex-wrap md:w-[20rem] '>
            <span className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'>
              <p className='text-base'>Micheal Hudson</p>
              <MdCancel />
            </span>
          </section>
        </div>
        <button className='button self-center'>Apply</button>
      </section>

      <main className='mt-[6rem]'>
        <header className='flex'>
          <p className='font-semibold text-[#4B5563]'>
            Scheduled Lesson:{' '}
            <span className='text-[#031F42] ml-1'>James Fisher</span>
          </p>

          <span className='flex gap-1 items-center text-[#1F2937] ml-[20rem]'>
            <BiCalendar />
            <p className='font-semibold text-[18px]'>Calender</p>
          </span>
        </header>

        {/* the calendar UI starts here */}

        <section className='mt-5'>
          <header className='grid grid-cols-7'>
            {weekdays.map((day) => {
              return (
                <div className='border p-3 font-semibold leading-5 text-center text-[#4B5563]'>
                  {day}
                </div>
              )
            })}
          </header>
          <main className='grid grid-cols-7'>
            <div className='border p-2'>
              {/* date at the top right coner of the container */}
              <p
                className='text-end text-[#1F2937] font-semibold
              text-[15px]'
              >
                12
              </p>
              {/* date ends here  */}

              {/* list of subjects starts */}
              <ul className='flex flex-col gap-1'>
                <li
                  className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'
                  onClick={handleOpen}
                >
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
              </ul>
              {/* list of subject ends  */}
            </div>
            <div className='border p-2'>
              {/* date at the top right coner of the container */}
              <p
                className='text-end text-[#1F2937] font-semibold
              text-[15px]'
              >
                12
              </p>
              {/* date ends here  */}

              {/* list of subjects starts */}
              <ul className='flex flex-col gap-1'>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
                <li className='truncate font-semibold text-[#1F2937] px-1 py-2 class-badge-bg rounded-r-[2px] border-l-4 border-[#FFE150]'>
                  Physics master class
                </li>
              </ul>
              {/* list of subject ends  */}
            </div>
          </main>
        </section>

        {/* { calendar UI ends here } */}
      </main>
      <BasicModal />
    </div>
  )
}

export default ScheduledLessons
