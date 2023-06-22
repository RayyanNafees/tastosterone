import React, { useState, useEffect } from 'react'
import EmployeeAccess from '../../../components/EmployeeAccess'
import { checkAuth } from '../../../data/checkAuth'
import { authConfig } from '../../../data/authConfig'
import { baseURL } from '../../../data/url'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { extractDateFromTimestamp as extractDate } from './extractDate'
import { structureAvailability } from '../../../data/structureAvailability'

const EmployeeProfile = () => {
  const [defaultMenu, setDefaultMenu] = useState(true)
  const config = authConfig()
  const navigate = useNavigate()
  const { employeeID } = useParams()
  const [employeeInfo, setEmployeeInfo] = useState(null)
  const [loadProfile, setLoadProfile] = useState(false)
  const [personalDetails, setPersonalDetails] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/auth/login')
      }
    })
  }, [])

  const setDataValues = (employeeInfo) => {
    if (!loadProfile) {
      setPersonalDetails([
        { title: 'Gender', value: employeeInfo.gender },
        { title: 'Date of Birth', value: '08/07/2001' },
        {
          title: 'Home Address',
          value: `${employeeInfo.address}, ${employeeInfo.state}, ${employeeInfo.country}.`,
        },
        {
          title: 'Phone Number',
          value: employeeInfo.phoneNumber,
        },
        {
          title: 'Personal Email',
          value: employeeInfo.email,
        },
      ])

      setInfo([
        { title: 'Role', value: 'Staff & Tutor' },
        { title: 'Position', value: 'Accountant' },
        {
          title: 'Hired date',
          value: extractDate(employeeInfo.hireDate),
        },
        {
          title: 'Bio',
          value: employeeInfo.add_info,
        },
        {
          title: 'Registered by',
          value: 'James Solomon',
        },
        {
          title: 'Specializations',
          value: String([JSON.parse(employeeInfo.specialization)]),
        },
        {
          title: 'Availabities',
          value: structureAvailability(
            JSON.parse(employeeInfo.availablilityData)
          ),
        },
      ])
    }
  }

  const fetchData = () => {
    return axios
      .get(`${baseURL}get-employee-info/${employeeID}`, config)
      .then((resp) => {
        setDataValues(resp.data)
        setEmployeeInfo(resp.data)
        console.log(resp.data)
        console.log(resp.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (!loadProfile) {
      fetchData().then(() => setLoadProfile(true))
    }
  }, [])

  const classesTaken = [
    {
      subject: 'Mathematics, Basic Junior 1',
      availabilities:
        'Monday, 08:00 am - 01: 00 pm, Tuesday, 08: 00 am - 11:00 am',
    },
    {
      subject: 'Mathematics, Basic Junior 1',
      availabilities:
        'Monday, 08:00 am - 01: 00 pm, Tuesday, 08: 00 am - 11:00 am',
    },
    {
      subject: 'Mathematics, Basic Junior 1',
      availabilities:
        'Monday, 08:00 am - 01: 00 pm, Tuesday, 08: 00 am - 11:00 am',
    },
    {
      subject: 'Mathematics, Basic Junior 1',
      availabilities:
        'Monday, 08:00 am - 01: 00 pm, Tuesday, 08: 00 am - 11:00 am',
    },
  ]

  const notficationSettings = [
    { title: 'Lesson reminder', value: true },
    { title: 'Contact student', value: false },
    { title: 'User account', value: true },
  ]

  const InfoSection = () => {
    return (
      <div className='mt-6'>
        {info.map((detail) => {
          const { title, value } = detail
          return (
            <span
              className='grid grid-cols-12 md:w-[40rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]'
              key={uuidv4()}
            >
              <p className='col-span-4 mb-6'>{title + ':'}</p>
              <p className='font-semibold col-span-7'>{value}</p>
            </span>
          )
        })}
      </div>
    )
  }

  const ClassesTaken = () => {
    return (
      <div className='mt-7'>
        <h3 className='class-page-subheading'>Class(es) Taken</h3>
        <section className='grid grid-cols-12 gap-3 bg-[#F3F4F6]'>
          {classesTaken.map((class_taken) => {
            const { subject, availabilities } = class_taken
            return (
              <div
                className='col-span-12 md:col-span-6 p-5 text-[#1F2937] '
                key={uuidv4()}
              >
                <span className='grid grid-cols-6'>
                  <p className='col-span-2'>Subject:</p>
                  <p className='col-span-4 font-semibold text-[#BF011B]'>
                    {subject}
                  </p>
                </span>
                <span className='grid grid-cols-6'>
                  <p className='col-span-2'>Availabilities:</p>
                  <p className='col-span-4 font-semibold '>{availabilities}</p>
                </span>
              </div>
            )
          })}
        </section>
      </div>
    )
  }

  const NotificationSettings = () => {
    return (
      <div className='mt-8'>
        <h3 className='class-page-subheading'>Notification settings</h3>
        <section>
          {notficationSettings.map((setting) => {
            const { value } = setting
            return (
              <span className='grid grid-cols-12 gap-2 mb-3' key={uuidv4()}>
                <p className='col-span-5 md:col-span-2 text-[#1F2937]'>
                  Lesson reminder:
                </p>

                <p
                  className={
                    value
                      ? 'col-span-5 font-semibold text-[#16A34A] tracking-[-0.02rem]'
                      : 'col-span-5 font-semibold text-[#DC2626] tracking-[-0.02rem]'
                  }
                >
                  {value ? 'True' : 'False'}
                </p>
              </span>
            )
          })}
        </section>
      </div>
    )
  }

  return (
    <div>
      {loadProfile ? (
        <section>
          <header>
            <h2 className='class-page-subheading mb-1'>Employee</h2>
            <p className='class-paragraph'>
              Here is the profile of employee;{' '}
              <span className='font-bold'>{`${employeeInfo.firstName} ${employeeInfo.lastName}`}</span>
            </p>
            <section className='mt-6 flex xs:flex-col md:flex-row xs:gap-5 md:gap-0'>
              <div className='mr-[140px] self-center'>
                <img
                  src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'
                  className='w-[200px] h-[200px] border-[2px] border-[#9CA3AF] rounded-[10px]'
                />
                <footer className='font-semibold text-center mt-4'>
                  {`${employeeInfo.firstName} ${employeeInfo.lastName}`}
                </footer>
              </div>

              <aside>
                <header>
                  <h3 className='class-page-subheading'>Personal details</h3>
                  <div>
                    {personalDetails.map((detail) => {
                      const { title, value } = detail
                      return (
                        <span
                          className='grid grid-cols-12 w-[23rem] mt-2 text-[#1F2937] leading-[28px] tracking-[-0.02rem]'
                          key={uuidv4()}
                        >
                          <p className='col-span-5'>{title + ':'}</p>
                          <p className='col-span-7 font-semibold'>{value}</p>
                        </span>
                      )
                    })}
                  </div>
                </header>
              </aside>
            </section>
          </header>
          <main className='mt-16'>
            <div className='w-full border-b flex'>
              <span className='w-[50%] text-start'>
                <button
                  className={
                    defaultMenu
                      ? 'border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5'
                      : ' font-semibold pb-5'
                  }
                  onClick={() => setDefaultMenu(true)}
                >
                  Other Details
                </button>
              </span>

              <span className='w-[50%] text-start'>
                <button
                  className={
                    !defaultMenu
                      ? 'border-b-2 border-[#BF011B] text-[#BF011B] font-semibold pb-5'
                      : ' font-semibold pb-5'
                  }
                  onClick={() => setDefaultMenu(false)}
                >
                  Permission
                </button>
              </span>
            </div>
            {defaultMenu ? (
              <section>
                <InfoSection />
                <ClassesTaken />
                <NotificationSettings />
              </section>
            ) : (
              <EmployeeAccess showSaveBtn={false} />
            )}
          </main>
        </section>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default EmployeeProfile
