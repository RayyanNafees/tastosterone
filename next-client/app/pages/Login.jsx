'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { baseURL } from '@/app/data/url'

import { useContext } from 'react'
import { UserAuthTokenContext, key } from '@/app/data/globalData'
import { useRouter } from 'next/navigation'
import CryptoJS from 'crypto-js'

const Login = () => {
  // useEffect to clear authData in the localStorage

  const [executed, setExecuted] = useState(true)

  useEffect(() => {
    if (executed) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user_info')
      setExecuted(false)
    }
  }, [])

  // useEffect ends here
  // state values that saves error data
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [showError, setShowError] = useState(false)
  const [loginError, setLoginError] = useState({ status: false, errorMsg: '' })
  const [errorData, setErrorData] = useState('')

  // global data for user auth token and email
  const { authData, setAuthData } = useContext(UserAuthTokenContext)

  const navigate = useRouter()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = () => {
    if (loginData.username && loginData.password) {
      axios
        .post(`${baseURL}${'auth/login/'}`, loginData)
        .then((response) => {
          setLoginError({ ...loginError, status: false })
          setShowError(false)

          const config = {
            headers: { Authorization: `token ${response.data['token']}` },
          }

          // const data = { email: loginData.username }

          axios
            .get(`${baseURL}${'auth/user-info/'}${loginData.username}`, config)
            .then((response) => {
              console.log(response.data)
              const user_info = response.data
              localStorage.setItem('user_info', JSON.stringify(user_info))
            })
            .catch((err) => console.log(err))
          console.log(response.data)
          if ('token' in response.data) {
            if (typeof Storage !== 'undefined') {
              const token = response.data['token']

              // encrypting the token
              const enctypted_token = CryptoJS.AES.encrypt(
                token,
                key
              ).toString()
              //encrypting ends

              localStorage.setItem('token', enctypted_token)
              localStorage.setItem('email', loginData.username)

              setAuthData({
                email: loginData.username,
                token: response.data['token'],
              })

              navigate.push('/master-admin')

              //on the long run the we'll use the user email to check the level of permission and refirect accordingly
            }
          }
        })
        .catch((error) => {
          const err = error['response']['data']
          console.log(err)
          if ('non_field_errors' in err) {
            console.log('invalid login details')
            setLoginError({
              status: true,
              errorMsg: 'enter correct email or password',
            })
          }
        })
    } else if (!loginData.username) {
      setLoginError({ ...loginError, status: false })
      setShowError(true)
      setErrorData('email')
    } else if (!loginData.password) {
      setLoginError({ ...loginError, status: false })
      setShowError(true)
      setErrorData('password')
    } else {
      setLoginError({ ...loginError, status: false })
      setShowError(true)
      setErrorData('email and password')
    }
  }
  return (
    <div className='flex flex-col items-center mt-5 '>
      <section className=' bg-white md:w-[30rem] p-5 reg-form'>
        <header className='text-[#4B5563] text-center'>
          <h1 className='text-2xl font-bold '>Login</h1>
          <p className='text-sm'>
            Good to see you, you, enter your login detail to access your account
          </p>
        </header>
        <form className='flex flex-col gap-10'>
          <span>
            <label htmlFor='email'>Email</label>
            <input
              type={'email'}
              placeholder='enter your email'
              id='email'
              name='username'
              className='reg-form-input'
              value={loginData.username}
              onChange={handleChange}
            />
          </span>

          <span>
            <label htmlFor='password'>Password</label>
            <input
              type={'password'}
              placeholder='password'
              id='password'
              name='password'
              className='reg-form-input'
              value={loginData.password}
              onChange={handleChange}
            />
          </span>
        </form>

        {/* handling error display starts */}
        {showError && (
          <span>
            <p className='text-[#BF011B] font-semibold pt-2'>
              Please enter your {errorData}
            </p>
          </span>
        )}

        {loginError.status && (
          <span>
            <p className='text-[#BF011B] font-semibold pt-2'>
              {loginError.errorMsg}
            </p>
          </span>
        )}

        {/* handling error display ends */}

        <footer className='flex flex-col gap-10 mt-2'>
          <p className='text=[#1F2937]'>
            Forget password?
            <span className='text-[#BF011B] font-normal'>Reset password</span>
          </p>
          <button className='self-center button w-fit' onClick={handleSubmit}>
            Login
          </button>
        </footer>
      </section>
    </div>
  )
}

export default Login
