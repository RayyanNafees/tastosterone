'use client'
import React, { useState, useRef } from 'react'
import { branchAdminRegFormData } from '@/app/data/data'
import axios from 'axios'
import { Link } from 'next/link'
import { baseURL } from '@/app/data/url'
import { UserDataContext } from '@/app/data/globalData'
import { validateEmail } from '@/app/data/validateEmail'

const RegisterOrg = () => {
  return (
    <div className='flex flex-col items-center overflow-hidden xs:w-screen xs:h-screen sm:w-full sm:h-full flex-nowrap justify-items-center'>
      <header className='self-start sm:hidden xs:inline '>
        <img src='/Logo.ong' alt='tas logo' className='w-24 mt-3 ml-2 ' />
      </header>
      <RegForm />
    </div>
  )
}

const RegForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  })

  const fnRef = useRef(null)
  const lnRef = useRef(null)
  const emailRef = useRef(null)
  const addressRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const passwordRef = useRef(null)
  const con_passwordRef = useRef(null)

  const refs = [
    fnRef,
    lnRef,
    emailRef,
    addressRef,
    phoneNumberRef,
    passwordRef,
    con_passwordRef,
  ]

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserInfo({ ...userInfo, [name]: value })
  }

  return (
    <form className='overflow-auto reg-form'>
      <div className='text-center text-[#4B5563] mt-5'>
        <h1 className='text-lg font-bold lg:text-2xl'>Create Account</h1>
        <p className='text-sm text-center'>
          To use TAS platform, kindly create an account first.
        </p>
      </div>

      <section className='grid items-center justify-center grid-cols-12 overflow-auto grid-row-6 gap-y-3 md:gap-x-5 p-9'>
        {branchAdminRegFormData.map((input) => {
          const { label, id, inputName, placeholder, info, type } = input

          return (
            <div className='col-span-12 md:col-span-6 ' key={id}>
              <label
                htmlFor={id}
                className='text-sm font-semibold text-[#1F2937]'
              >
                {label}
              </label>
              <br />
              <input
                type={type}
                placeholder={placeholder}
                id={inputName}
                name={inputName}
                value={userInfo[inputName]}
                onChange={handleChange}
                ref={refs[id]}
                className='reg-form-input'
              />
              {info && (
                <p className='text-xs text-[#4B5563]'>
                  <span className='text-[#BF011B]'>Note!</span> You can change
                  it later
                </p>
              )}
            </div>
          )
        })}
        <FormFooter userInfo={userInfo} refs={refs} setUserInfo={setUserInfo} />
      </section>
    </form>
  )
}

const FormFooter = (data) => {
  const { regData, setRegData } = React.useContext(UserDataContext)
  const t_and_cRef = useRef(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorText, setErrorText] = useState('')
  // const [t_and_c, setT_and_c] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()

    // const validateNumber = (number) => {
    //   // var re = /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    //   var re = /^\d{10}$/
    //   return re.test(number.toLowerCase())
    // }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password,
      confirmPassword,
    } = data.userInfo

    const userInfo = data.userInfo
    const refs = data.refs

    if (
      firstName &&
      lastName &&
      email &&
      phoneNumber &&
      address &&
      password &&
      confirmPassword
    ) {
      if (password === confirmPassword) {
        if (validateEmail(userInfo['email'])) {
          if (t_and_cRef.current.checked) {
            console.log('thank you')

            axios
              .post(`${baseURL}${'master/branch-admin/'}`, userInfo)
              .then((response) => {
                setRegData({ ...data.userInfo })
                console.log(response.data)
                if (typeof Storage !== 'undefined') {
                  localStorage.setItem('reg-email', userInfo.email)
                }
                setIsSubmitted(true)
              })
              .catch((error) => {
                const err = error['response']['data']
                console.log(err)
                if ('email' in err) {
                  setErrorText(err['email'])
                } else if ('phoneNumber' in err) {
                  setErrorText(err['phoneNumber'])
                }
              })
          } else {
            console.log('please check the t and c box')
          }
        } else {
          refs[2].current.placeholder = 'Enter a valid email'
          refs[2].current.value = ''
          refs[2].current.className = 'reg-form-input-error'
        }
      } else {
        // refs[4].current.value = ''
        // refs[5].current.value = ''
        data.setUserInfo({ ...userInfo, password: '', confirmPassword: '' })
        refs[5].current.placeholder = "Password fields don't match"
        refs[6].current.placeholder = "Password fields don't match"
        refs[5].current.className = 'reg-form-input-error'
        refs[6].current.className = 'reg-form-input-error'
      }
    } else {
      for (let i = 0; i < refs.length; i++) {
        if (!refs[i].current.value) {
          refs[i].current.placeholder = 'This field cannot be empty'
          refs[i].current.className = 'reg-form-input-error'
        } else {
          refs[i].current.className = 'reg-form-input'
        }
      }
    }
  }

  if (isSubmitted) {
    return <Link href='/branch-admin/verify' />
  }

  return (
    <div className='flex flex-col col-span-12 gap-5 lg:row-start-6'>
      <label htmlFor='t_and_c'>
        <p className='flex items-center text-sm text-center'>
          <input
            type='checkbox'
            id='t_and_c'
            className='mr-2'
            ref={t_and_cRef}
          />
          I agree to the{' '}
          <a href='#' className='text-[#BF011B] px-1'>
            Terms and services
          </a>
          of TAS
        </p>
      </label>
      <span className='text-[#d13131] text-sm font-bold text-center '>
        {errorText}
      </span>
      <button
        className='bg-[#031F42] text-white w-[12.19rem] h-[2.6rem] rounded-md self-center'
        onClick={handleSubmit}
      >
        Create Account
      </button>
      <p className='flex items-center text-sm text-center'>
        Existing member?
        <a href='#' className='text-[#BF011B] px-1'>
          Login here
        </a>
      </p>
    </div>
  )
}

export default RegisterOrg
