import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineUsers } from 'react-icons/hi'
import { BsArrowDownRight } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { TbFileInvoice } from 'react-icons/tb'

// import { UserAuthTokenContext } from '../../data/globalData'

import Plot from 'react-plotly.js'
import { checkAuth, check_if_branch } from '../../data/checkAuth'

const Dashboard = () => {
  // const { authData, setAuthData } = useContext(UserAuthTokenContext)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
      .then(() => {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
          navigate('/auth/login')
        } else {
          const user_info = JSON.parse(localStorage.getItem('user_info'))
          const fName = user_info['first_name']
          const lName = user_info['last_name']
          setName(`${fName} ${lName}`)
        }
      })
      .then(() => {
        const email = localStorage.getItem('email')
        check_if_branch(email).then(() => {
          console.log('checking if branch')
          if (
            localStorage.getItem('isLoggedIn') === 'true' &&
            localStorage.getItem('isBranch') !== 'true'
          ) {
            navigate('/branch-admin/branch-not-found')
          }
        })
      })
  }, [])

  const data = [
    {
      x: [1, 2, 3],
      y: [2, 6, 3],
      type: 'scatter',
      mode: 'lines+points',
      marker: { color: 'red' },
    },
  ]

  const layout = {
    title: 'My Plot',
    xaxis: {
      title: 'X Axis',
    },
    yaxis: {
      title: 'Y Axis',
    },
  }
  return (
    <div className='overflow-y-auto'>
      <header>
        <h1 className='text-[#031F42] text-lg font-semibold'>
          Welcome {name},
        </h1>
        <p className='text-[16px] text-[#4B5563] tracking-[-0.02rem] leading-7'>
          Here is a snippet of your performance this month.
        </p>
      </header>

      <main>
        <section className='lg:flex lg:gap-3'>
          <div className='flex flex-col justify-between py-7 px-5 border border-[#E5E7EB] h-[10.13rem] w-full rounded-[0.69rem] font-montserrat shadow-summaryBox mt-9'>
            <section className='flex flex-row justify-between items-center'>
              <div className='flex flex-col gap-3 text-[#1F2937]'>
                <h1 className='font-medium text-base '>Total Students</h1>
                <h1 className='font-semibold text-[26px] '>0</h1>
              </div>
              <span className='bg-[#9B0E7C] h-[3.13rem] w-[3.13rem] rounded-full flex items-center justify-center'>
                <HiOutlineUsers
                  className='w-9 text-white'
                  style={{ fontWeight: 'bolder' }}
                />
              </span>
            </section>
            <span className='flex gap-3 text-xs font-medium'>
              <span className='text-[#EF4343] flex gap-2'>
                <BsArrowDownRight />
                <p>0%</p>
              </span>
              <span className='text-[#1F2937]'>
                <p>+0 since last 7 days</p>
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-between py-7 px-5 border border-[#E5E7EB] h-[10.13rem] w-full rounded-[0.69rem] font-montserrat shadow-summaryBox mt-9'>
            <section className='flex flex-row justify-between items-center'>
              <div className='flex flex-col gap-3 text-[#1F2937]'>
                <h1 className='font-medium text-base '>Active Students</h1>
                <h1 className='font-semibold text-[26px] '>0</h1>
              </div>
              <span className='bg-[#F1096A] h-[3.13rem] w-[3.13rem] rounded-full flex items-center justify-center'>
                <AiOutlineUserAdd
                  className='w-9 text-white'
                  style={{ fontWeight: 'bolder' }}
                />
              </span>
            </section>
            <span className='flex gap-3 text-xs font-medium'>
              <span className='text-[#EF4343] flex gap-2'>
                <BsArrowDownRight />
                <p>0%</p>
              </span>
              <span className='text-[#1F2937]'>
                <p>+0 since last 7 days</p>
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-between py-7 px-5 border border-[#E5E7EB] h-[10.13rem] w-full rounded-[0.69rem] font-montserrat shadow-summaryBox mt-9'>
            <section className='flex flex-row justify-between items-center'>
              <div className='flex flex-col gap-3 text-[#1F2937]'>
                <h1 className='font-medium text-base '>Overdue invoices</h1>
                <h1 className='font-semibold text-[26px] '>USD 0.00</h1>
              </div>
              <span className='bg-[#461EF5] h-[3.13rem] w-[3.13rem] rounded-full flex items-center justify-center'>
                <TbFileInvoice
                  className='w-9 text-white'
                  style={{ fontWeight: 'bolder' }}
                />
              </span>
            </section>
            <span className='flex gap-3 text-xs font-medium'>
              <span className='text-[#EF4343] flex gap-2'>
                <BsArrowDownRight />
                <p>0%</p>
              </span>
              <span className='text-[#1F2937]'>
                <p>+0 since last 7 days</p>
              </span>
            </span>
          </div>

          <div className='flex flex-col justify-between py-7 px-5 border border-[#E5E7EB] h-[10.13rem] w-full rounded-[0.69rem] font-montserrat shadow-summaryBox mt-9'>
            <section className='flex flex-row justify-between items-center'>
              <div className='flex flex-col gap-3 text-[#1F2937]'>
                <h1 className='font-medium text-base '>Paid invoices</h1>
                <h1 className='font-semibold text-[26px] '>USD 0.00</h1>
              </div>
              <span className='bg-[#3FB82B] h-[3.13rem] w-[3.13rem] rounded-full flex items-center justify-center'>
                <TbFileInvoice
                  className='w-9 text-white'
                  style={{ fontWeight: 'bolder' }}
                />
              </span>
            </section>
            <span className='flex gap-3 text-xs font-medium'>
              <span className='text-[#EF4343] flex gap-2'>
                <BsArrowDownRight />
                <p>0%</p>
              </span>
              <span className='text-[#1F2937]'>
                <p>+0 since last 7 days</p>
              </span>
            </span>
          </div>
        </section>

        <section className='mt-5'>
          <Plot data={data} layout={layout} />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
