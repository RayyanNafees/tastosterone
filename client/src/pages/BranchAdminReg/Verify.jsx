import React, { useEffect, useState } from 'react'
import { UserDataContext } from '../../data/globalData'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../data/url'

const Verify = () => {
  const isFirstRun = React.useRef(true)

  const { regData, setRegData } = React.useContext(UserDataContext)
  const [otpInput, setOtpInput] = React.useState('')
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.getOwnPropertyNames(regData).length === 0) {
      return navigate('/branch-admin/register')
    } else {
      console.log(regData)
      if (isFirstRun.current) {
        isFirstRun.current = false
        return
      }
      axios
        .post(`${baseURL}${'otp/verify-otp/'}`, { email: regData.email })
        .then((response) => {
          console.log(response.data)
          sessionStorage.setItem('otp', response.data['otp'])
        })
        .catch((error) => {
          console.log(error.data)
        })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .patch(
        `${baseURL}${'master/branch-admin/'}${regData.email}${'/isVerified/'}`,
        {
          otp: otpInput,
        }
      )
      .then((response) => {
        console.log(response.data)
        console.log('nice')
        if ('otp error' in response.data) {
          setShowError(true)
          setErrorMsg('Invalid OTP')
        } else navigate('/auth/login')
      })
      .catch((error) => {
        console.log(error.status)
      })
  }

  const handleChange = (e) => {
    setOtpInput(e.target.value)
  }

  return (
    <div className='flex justify-center items-center py-3 mt-[5rem] '>
      <main className='w-[21.25rem] md:w-[30.25rem] lg:w-[46.50rem] lg:border-t-2 border-[#BF011B] rounded-[10px] bg-white p-10'>
        <span className='flex flex-col gap-2'>
          <h2 className='text-[#1F2937] text-[22px] lg:text-2xl font-bold text-center'>
            We just sent you a code
          </h2>
          <p className='text-[#4B5563] text-sm text-center'>
            Enter the OTP that was sent to{' '}
            <span>{localStorage.getItem('reg-email')}</span>
          </p>
        </span>
        <form className='mt-7'>
          <label
            htmlFor='otp-input'
            className='text-sm font-semibold text-[#1F2937]'
          >
            Enter OTP
          </label>
          <br />
          <input
            type='number'
            placeholder='input OTP code'
            id='otp-input'
            value={otpInput}
            onChange={handleChange}
            className='reg-form-input '
          />
          {showError && (
            <p className='font-semibold text-lg text-center'>{errorMsg}</p>
          )}

          <div className='flex items-center justify-center py-2 mt-2'>
            <button
              className='bg-[#031F42] text-white w-[12.19rem] h-[2.6rem] rounded-md self-center'
              onClick={handleSubmit}
            >
              Proceed
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Verify
