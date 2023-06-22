import React, { useState } from 'react'
import Badge from '../../../components/Badge'
import BarChart from '../../../components/BarChart'
import DonutChart from '../../../components/DonutChart'

import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'

const StudentTables = () => {
  return (
    <div className='overflow-auto mt-5'>
      <table className='w-full text-[#1F2937] tracking-[-0.02rem]'>
        <thead className='bg-[#F3F4F6] font-semibold'>
          <tr className='text-center'>
            <th className='whitespace-nowrap p-3 text-left'>Name</th>
            <th className='whitespace-nowrap p-3 text-left'>Date Joined</th>
            <th className='whitespace-nowrap p-3 text-left'>Attendance</th>
            <th className='whitespace-nowrap p-3 text-left'>Status</th>
          </tr>
        </thead>
        <tbody className='whitespace-nowrap text-sm divide-y divide-gray-300'>
          <tr>
            {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
            {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
            <td className='p-3'>John Moore</td>
            <td className='p-3'>21/07/2022</td>
            <td className='p-3'>20</td>
            <td className='p-3'>
              <Badge status='active' />
            </td>
          </tr>
          <tr>
            {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
            {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
            <td className='p-3'>John Moore</td>
            <td className='p-3'>21/07/2022</td>
            <td className='p-3'>20</td>
            <td className='p-3'>
              <Badge status='active' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const TimelineTable = () => {
  return (
    <div className='overflow-auto mt-5'>
      <table className='w-full text-[#1F2937] tracking-[-0.02rem]'>
        <thead className='bg-[#F3F4F6] font-semibold'>
          <tr className='text-center'>
            <th className='whitespace-nowrap p-3 text-left'>Date</th>
            <th className='whitespace-nowrap p-3 text-left'>Time Frame</th>
            <th className='whitespace-nowrap p-3 text-left'>Attendance</th>
            <th className='whitespace-nowrap p-3 text-left'>Status</th>
          </tr>
        </thead>
        <tbody className='whitespace-nowrap text-sm divide-y divide-gray-300'>
          <tr>
            {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
            {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
            <td className='p-3'>10/12/2022</td>
            <td className='p-3'>09:30 am to 12:06 pm</td>
            <td className='p-3'>20</td>
            <td className='p-3'>
              <Badge status='ongoing' />
            </td>
          </tr>
          <tr>
            {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
            {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
            <td className='p-3'>John Moore</td>
            <td className='p-3'>21/07/2022</td>
            <td className='p-3'>20</td>
            <td className='p-3'>
              <Badge status='cancelled' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Class = () => {
  const [TableMenu, setTableMenu] = useState({
    student: true,
    timeline: false,
    module: false,
  })
  const [showDescr, setShowDescr] = useState(false)

  // this function handle the menu and the data to be displayes beneath the menu
  const handleMenu = (name) => {
    if (name === 'student') {
      setTableMenu({
        student: true,
        timeline: false,
        module: false,
      })
    } else if (name === 'timeline') {
      setTableMenu({
        student: false,
        timeline: true,
        module: false,
      })
    } else if (name === 'module') {
      setTableMenu({
        student: false,
        timeline: false,
        module: true,
      })
    }
    const element = document.getElementById(name)
    element.className =
      'h-[52px] w-full md:w-[40%] pl-3 flex items-center bg-[#F3F4F6] border-t-4 border-[#BF011B]'
    console.log(element.className)
    for (let menu in TableMenu) {
      if (menu !== name) {
        document.getElementById(menu).className =
          'h-[52px] bg-white w-full md:w-[50%] pl-3 flex items-center'
      }
    }
  }

  const ChartContainer = () => {
    return (
      <section className='w-full grid xs:grid-row-6 xs:grid-cols-none md:grid-cols-12 px-2 gap-2'>
        <main className='md:col-span-8 h-[32.75rem]'>
          <BarChart />
        </main>
        <aside className='md:col-span-4  h-[32.75rem]'>
          <DonutChart />
        </aside>
      </section>
    )
  }

  const ClassModule = () => {
    return (
      <section>
        <div className='mt-9 bg-[#F3F4F6] py-3 px-2'>
          <h3 className='text-lg font-semibold'>Topics to be treated</h3>
          <section className='mt-8'>
            <div className='flex flex-col items-start justify-between px-2 bg-white py-4 border-l-4 border-[#BF011B]'>
              <div className='w-full flex justify-between '>
                <h4 className='text-base font-semibold text-[#031F42]'>
                  Introduction to Chemistry
                </h4>
                <span className='flex items-center justify-center gap-2'>
                  <input
                    type='checkbox'
                    name='check-topic'
                    id='check-topic'
                    className='bg-[#15803D] text-white w-fit  '
                  />
                  <label
                    for='check-topic'
                    className='text-[#15803D] font-semibold text-sm'
                  >
                    Treated
                  </label>
                  <div
                    className='ml-3'
                    onClick={() => setShowDescr(!showDescr)}
                  >
                    {showDescr ? <AiFillCaretUp /> : <AiFillCaretDown />}
                  </div>
                </span>
              </div>
              {showDescr && (
                <p className='text-[#4B5563] text-sm'>
                  In the introduction to chemistry, the tutor will teach the
                  basic things students needs to know about chemistry.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    )
  }

  let data = <StudentTables />
  if (TableMenu.module) {
    data = <ClassModule />
  } else if (TableMenu.timeline) {
    data = <TimelineTable />
  } else if (TableMenu.student) {
    data = <StudentTables />
  }
  return (
    <div>
      <header>
        <h1 className='class-page-subheading'>Class</h1>

        <h2 className='class-page-subheading text-base'>
          Basic Biology for junior 4
        </h2>
        <p className='class-paragraph'>
          Basic biology is the beginner class level class for junior 4 that they
          must take as junior in High school.
        </p>
      </header>

      <main className='bg-[#F3F4F6] mt-9'>
        <header>
          <ul className='flex flex-col md:flex-row gap-1 w-full bg-white'>
            <li className='h-[52px] w-full md:w-[40%] pl-3 flex items-center bg-[#F3F4F6] border-t-4 border-[#BF011B]'>
              Group Class
            </li>
            <li className='h-[52px] bg-white w-full md:w-[50%] pl-3 flex items-center'>
              Private Class
            </li>
          </ul>
        </header>
        <section className='flex flex-col gap-6 p-3'>
          <span className='flex gap-3'>
            <h3 className='text-[#1F2937] font-semibold'>Student No:</h3>
            <p className='text-[#4B5563]'>15</p>
          </span>
          <span className='flex gap-3'>
            <h3 className='text-[#1F2937] font-semibold'>Group Class Fee:</h3>
            <p className='text-[#4B5563]'>USD 125.00 per month</p>
          </span>
          <span className='flex gap-3'>
            <h3 className='text-[#1F2937] font-semibold'>Status:</h3>
            <Badge status='completed' />
          </span>

          <span className='flex gap-3'>
            <h3 className='text-[#1F2937] font-semibold'>Tutor(s):</h3>
            <div className='flex flex-col gap-3 text-[#BF011B]'>
              <p>Mary Helenee</p>
              <p>Brooklyn Simmons</p>
              <p>Guy Hawkins</p>
            </div>
          </span>
        </section>
        <ChartContainer />

        <section className='mt-9'>
          <header>
            <ul className='flex flex-col md:flex-row gap-1 w-full bg-white'>
              <li
                className='h-[52px] w-full md:w-[40%] pl-3 flex items-center bg-[#F3F4F6] border-t-4 border-[#BF011B]'
                id='student'
                onClick={() => handleMenu('student')}
              >
                Student
              </li>
              <li
                className='h-[52px] bg-white w-full md:w-[50%] pl-3 flex items-center'
                id='timeline'
                onClick={() => handleMenu('timeline')}
              >
                Timeline
              </li>
              <li
                className='h-[52px] bg-white w-full md:w-[50%] pl-3 flex items-center'
                id='module'
                onClick={() => handleMenu('module')}
              >
                Module
              </li>
            </ul>
          </header>
          <main>{data}</main>
        </section>
      </main>
    </div>
  )
}

export default Class
