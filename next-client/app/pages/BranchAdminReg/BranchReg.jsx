import React, { useState, useRef, useEffect } from 'react'
import { BranchRegData } from '../../data/data'
import axios from 'axios'
import { baseURL } from '../../data/url'
import { validateEmail } from '../../data/validateEmail'
import { useRouter } from 'next/navigation'
import { check_if_branch, checkAuth } from '../../data/checkAuth'

const BranchReg = () => {
  const navigate = useRouter()
  const makeFormObj = () => {
    let formObj = {}
    // let index = 0;
    BranchRegData.map((data) => {
      formObj = { ...formObj, [data['inputName']]: '' }
    })

    return formObj
  }

  // const email = JSON.parse(localStorage.getItem('user_info'))['email']

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate.push'/auth/login')
      } else {
        const email = JSON.parse(localStorage.getItem('user_info'))['email']

        if (email) {
          check_if_branch(email).then(() => {
            if (localStorage.getItem('isBranch') === 'true') {
              navigate.push'/master-admin')
            }
          })
        }
      }
    })
  }, [])

  // useEffect(() => {
  //   check_if_branch(email).then(() => {
  //     if (localStorage.getItem('isBranch') == 'true') {
  //       navigate.push'/master-admin/')
  //     }
  //   })
  // })

  const [branchInfo, setBranchInfo] = useState({
    ...makeFormObj(),
  })

  const name = useRef(null)
  const emailRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const addressRef = useRef(null)
  const city = useRef(null)
  const stateRef = useRef(null)
  const zip_code = useRef(null)
  const countryRef = useRef(null)

  const refs = [
    name,
    emailRef,
    phoneNumberRef,
    addressRef,
    city,
    stateRef,
    zip_code,
    countryRef,
  ]

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBranchInfo({ ...branchInfo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('branch data', branchInfo)
    const keys = Object.keys(branchInfo)
    for (let prop in branchInfo) {
      const index = keys.indexOf(prop)
      if (!(index > 11)) {
        if (branchInfo[prop] === '') {
          refs[index].current.placeholder = "this field can't be empty"
          refs[index].current.className = 'reg-form-input-error'
        } else {
          refs[index].current.placeholder = ''
          refs[index].current.className = 'reg-form-input'
        }
      }
    }

    const email_is_valid = validateEmail(branchInfo['email'])
    if (email_is_valid) {
      console.log('valid email')

      const newBranchInfo = {
        ...branchInfo,
      }

      axios
        .post(`${baseURL}${'master/branch/'}`, newBranchInfo)
        .then((resp) => {
          console.log(resp)
          const data = resp.data
          if (data['error'] === 'Admin email error') {
            const email_index = keys.indexOf('email')
            setBranchInfo({ ...branchInfo, email: '' })
            refs[email_index].current.placeholder = 'Incorrect admin email'
            refs[email_index].current.className = 'reg-form-input-error'
          }
          if (resp.status === 201) {
            console.log(JSON.stringify(resp.data))
            localStorage.setItem('branchInfo', JSON.stringify(resp.data))
            localStorage.setItem('isBranch', true)
            navigate.push'/master-admin/')
          }
        })
        .catch((err) => console.log(err))

      // here
    } else {
      const email_index = keys.indexOf('email')
      setBranchInfo({ ...branchInfo, email: '' })
      refs[email_index].current.placeholder = 'enter a valid email'
      refs[email_index].current.className = 'reg-form-input-error'
    }
  }

  return (
    <div className='m-5'>
      <header className='text-center'>
        <h2 className='class-page-subheading mb-1'>Setup New Location</h2>
        <footer className='class-paragraph text-sm'>
          Complete the form below to add branch using the TAS Application.
        </footer>
      </header>

      <main className='mt-5'>
        <header className='class-page-subheading'>Branch Profile</header>
        <footer className='class-paragraph text-sm'>
          Enter the location name which will be displayed throughout the
          organisation account as well as emails sent from the account.
        </footer>

        <form>
          <main className='xs:flex xs:flex-col md:grid md:grid-cols-12 md:gap-x-8 gap-y-6 mt-3'>
            {BranchRegData.map((data) => {
              const { id, label, inputName, type } = data
              return (
                <span className='col-span-6' key={id}>
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
                    value={branchInfo[inputName]}
                    onChange={handleChange}
                    ref={refs[id]}
                  />
                </span>
              )
            })}
          </main>

          <button className='button mt-5' onClick={handleSubmit}>
            Update Branch Data
          </button>
        </form>
      </main>
    </div>
  )
}

export default BranchReg
