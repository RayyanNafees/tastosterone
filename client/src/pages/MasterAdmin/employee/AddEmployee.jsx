/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useRef } from 'react'
import EmployeeAccess from '../../../components/EmployeeAccess'
import Availability from '../../../components/Availability'
import AssignSubject from '../../../components/AssignSubject'
import { EmployeeRegData } from '../../../data/data'
import { checkAuth } from '../../../data/checkAuth'
import { useNavigate } from 'react-router-dom'
import SaveGroupBtn from '../../../components/SaveGroupBtn'
import { validateEmail } from '../../../data/validateEmail'
import axios from 'axios'
import { baseURL } from '../../../data/url'
import { key } from '../../../data/globalData'
import CryptoJS from 'crypto-js'

import { availabilityData, subjectData } from '../../../data/globalData'

const AddEmployee = () => {
  const navigate = useNavigate()
  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/auth/login')
      }
    })
  }, [])

  const makeFormObj = () => {
    let formObj = {}
    // let index = 0;
    EmployeeRegData.map((employee) => {
      formObj = { ...formObj, [employee['inputName']]: '' }
    })

    return formObj
  }

  const [employeeInfo, setEmployeeInfo] = useState({
    ...makeFormObj(),
    add_info: '',
  })

  const fnRef = useRef(null)
  const lnRef = useRef(null)
  const gender = useRef(null)
  const emailRef = useRef(null)
  const DOBRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const addressRef = useRef(null)
  const stateRef = useRef(null)
  const countryRef = useRef(null)
  const zip_code = useRef(null)
  const SSNRef = useRef(null)
  const RoutingRef = useRef(null)
  const AccRef = useRef(null)

  const refs = [
    fnRef,
    lnRef,
    gender,
    emailRef,
    DOBRef,
    phoneNumberRef,
    addressRef,
    stateRef,
    countryRef,
    zip_code,
    SSNRef,
    RoutingRef,
    AccRef,
  ]

  const encrypted_token = localStorage.getItem('token')
  let decrypted_token
  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  }

  const [availableData, setAvailableData] = useState([])
  const [subjects, setSubjects] = useState([])

  const config = { headers: { Authorization: `token ${decrypted_token}` } }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setEmployeeInfo({ ...employeeInfo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('student', employeeInfo)
    const keys = Object.keys(employeeInfo)
    for (let prop in employeeInfo) {
      const index = keys.indexOf(prop)
      if (!(index > 12)) {
        if (employeeInfo[prop] === '') {
          refs[index].current.placeholder = "this field can't be empty"
          refs[index].current.className = 'reg-form-input-error'
        } else {
          refs[index].current.placeholder = ''
          refs[index].current.className = 'reg-form-input'
        }
      }
    }

    const email_is_valid = validateEmail(employeeInfo['email'])
    if (email_is_valid) {
      const branch = JSON.parse(localStorage.getItem('branchInfo'))['id']
      const specialization = JSON.stringify(subjects)
      const availablilityData = JSON.stringify(availableData)

      const newEmployeeInfo = {
        ...employeeInfo,
        branch,
        specialization,
        availablilityData,
      }

      axios
        .post(`${baseURL}${'tutors/'}`, newEmployeeInfo, config)
        .then((resp) => {
          console.log(resp)
          localStorage.removeItem(availablilityData)
          localStorage.removeItem(specialization)
          const data = resp.data
          if (resp.status === 201) {
            navigate(`/master-admin/employee-profile/${data.id}`)
          }
        })
        .catch((err) => {
          const err_data = err.response.data
          console.log(err_data)
          if (err_data['email']) {
            const email_index = keys.indexOf('email')
            setEmployeeInfo({ ...employeeInfo, email: '' })
            refs[email_index].current.placeholder = 'email has been used'
            refs[email_index].current.className = 'reg-form-input-error'
          }

          if (err_data['phoneNumber']) {
            const phoneNumberIndex = keys.indexOf('phoneNumber')
            setEmployeeInfo({ ...employeeInfo, phoneNumber: '' })
            refs[phoneNumberIndex].current.placeholder = err_data['phoneNumber']
            refs[phoneNumberIndex].current.className = 'reg-form-input-error'
          }
        })

      // here
    } else {
      const email_index = keys.indexOf('email')
      setEmployeeInfo({ ...employeeInfo, email: '' })
      refs[email_index].current.placeholder = 'enter a valid email'
      refs[email_index].current.className = 'reg-form-input-error'
    }
  }

  return (
    <availabilityData.Provider value={{ availableData, setAvailableData }}>
      <subjectData.Provider value={{ subjects, setSubjects }}>
        <div>
          <h1 className='class-page-subheading text-2xl'>Add New Employee</h1>
          <p className='class-paragraph'>
            Use the below form to add new employee to your database
          </p>

          <h2 className='class-page-subheading mt-5'>
            Add employee career information
          </h2>
          <article className='class-paragraph'>
            Add an employee as a Tutor or Staff. Tutor have access to their own
            schedules, students and related information. Staff accounts can be
            given access to administrative work. If an employee teaches and
            performs administrative work, you can select the staff option and
            check the box to include the employee as a tutor.
          </article>

          <section className='mt-9'>
            <form className=' w-full xs:flex-col md:flex-row gap-5 md:justify-start'>
              <section className='flex xs:flex-col md:flex-row gap-5 md:justify-start'>
                <span className='w-[19.25rem]'>
                  <label htmlFor='employee-role' className='class-input-label'>
                    Employee Role
                  </label>
                  <select className='border bg-white rounded-md text-sm class-input h-[3.25rem]'>
                    <option className='bg-blue-700'>View class</option>
                    <option>Edit class</option>
                    <option>Delete class</option>
                    <option>Deactivate class</option>
                  </select>
                </span>

                <span className='w-[19.25rem]'>
                  <label htmlFor='position' className='class-input-label'>
                    Position
                  </label>
                  <input
                    id='position'
                    className='class-input h-[3.25rem] '
                    type='text'
                    placeholder='Input position for employee’s '
                  />
                </span>

                <span className='w-[19.25rem]'>
                  <label htmlFor='hire-date' className='class-input-label mr-2'>
                    Hire Date
                  </label>
                  <input
                    id='hire-date'
                    className='class-input bg-white h-[3.25rem]'
                    type='date'
                    placeholder='27/03/2022'
                  />
                </span>
              </section>

              <section className='mt-4 flex gap-1 flex-col'>
                <span className='flex gap-1'>
                  <input type='checkbox' id='include-tutor' />
                  <label
                    htmlFor='include-tutor'
                    className='text-[#1F2937] font-semibold'
                  >
                    Include as Tutor
                  </label>
                </span>
                <footer className='text-sm text-[#1F2937]'>
                  If checked, staff will be allow to also tutor
                </footer>
              </section>

              {/* employess's personal info */}
              <section>
                <h2 className='class-page-subheading mb-1 mt-5'>
                  Add employee personal information
                </h2>
                <p className='class-paragraph mt-1'>
                  // eslint-disable-next-line react/no-unescaped-entities Input
                  the {"employee's"} name and contact information in this
                  section.
                </p>

                <main className='xs:flex xs:flex-col md:grid md:grid-cols-12 md:gap-x-10 gap-y-8 mt-3'>
                  {EmployeeRegData.map((data) => {
                    const { id, label, inputName, placeholder, info, type } =
                      data
                    return (
                      <span className='col-span-4' key={id}>
                        <label
                          htmlFor={inputName}
                          className='font-semibold text-base text-[#1F2937]'
                        >
                          {label}
                        </label>
                        <input
                          className='class-input'
                          type={type}
                          id={inputName}
                          name={inputName}
                          placeholder={placeholder}
                          value={employeeInfo[inputName]}
                          onChange={handleChange}
                          ref={refs[id]}
                        />
                      </span>
                    )
                  })}
                </main>
              </section>

              {/* employee's personal info ends */}

              {/* bio section */}
              <div>
                <span className='flex flex-col mt-4'>
                  <label
                    htmlFor='employee-bio'
                    className='class-input-label my-2'
                  >
                    {"Employee's Bio"}
                  </label>
                  <textarea
                    placeholder='add additional information'
                    className='class-input w-[85vw] md:w-[31.88rem] h-[7.63rem]'
                    name='add_info'
                    value={employeeInfo.add_info}
                    onChange={handleChange}
                  ></textarea>
                </span>
              </div>
              {/* bio section ends */}
            </form>
            <span>
              <header>
                <h2 className='class-page-subheading mb-1 mt-5'>
                  Add class / subject employee can tutor
                </h2>
                <p className='class-paragraph'>
                  Input subject the employee can tutor to serve as reference
                  when assigning tutor to student, If you leave these fields
                  blank, then the employee will be considered available to tutor
                  all classes.
                </p>
              </header>
              <AssignSubject />
            </span>
            <Availability />

            <EmployeeAccess />
            <SaveGroupBtn handleSubmit={handleSubmit} />
          </section>
        </div>
      </subjectData.Provider>
    </availabilityData.Provider>
  )
}

export default AddEmployee
