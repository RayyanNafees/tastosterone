import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { baseURL } from '../data/url'
import CryptoJS from 'crypto-js'
import { key } from '../data/globalData'

const EnrollModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const encrypted_token = localStorage.getItem('token')
  let decrypted_token
  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  }

  const config = { headers: { Authorization: `token ${decrypted_token}` } }

  const handleNavigateToAddFamily = () => {
    router.push('/master-admin/add-family')
  }

  const validateEmail = () => {
    if (!email) {
      setErrorMsg('Please enter a valid email address')
      setShowError(true)
      return
    }

    axios
      .get(`${baseURL}${'validate-family/'}${email}`, config)
      .then((resp) => {
        setShowError(false)
        localStorage.setItem('familyEmail', email)
        localStorage.setItem('familyID', resp.data['id'])
        router.push('/master-admin/add-student')
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMsg('This family email has not been registered')
          setShowError(true)
        }
      })
  }

  return (
    <div>
      <button className='button' onClick={handleOpen}>
        Register
      </button>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={handleClose}
          ></div>
          <div className='z-10 p-6 mx-4 bg-white rounded-lg shadow-lg md:mx-auto md:max-w-2xl'>
            <h1 className='font-semibold text-center'>
              Enter your family registered email
            </h1>
            <div className='flex flex-col gap-3 mt-5'>
              <input
                type='email'
                placeholder="Enter family's email"
                className='p-2 outline-none'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='button' onClick={validateEmail}>
                Submit
              </button>
            </div>
            {showError && (
              <footer className='text-sm font-semibold text-red-600'>
                {errorMsg}
              </footer>
            )}
            <div className='flex flex-col gap-2 mt-7'>
              <h4 className='font-semibold text-center'>
                Family not registered yet?
              </h4>
              <button
                className='self-center p-3 font-semibold text-red-600 rounded-md button-outline w-fit'
                onClick={handleNavigateToAddFamily}
              >
                Register a new family
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnrollModal
