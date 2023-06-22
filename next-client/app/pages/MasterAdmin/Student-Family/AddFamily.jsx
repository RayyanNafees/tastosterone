'use client'
import React, { useState, useRef, useEffect } from 'react'
import SaveGroupBtn from '@/app/components/SaveGroupBtn'
import { familyRegData } from '@/app/data/data'
import { validateEmail } from '@/app/data/validateEmail'
import axios from 'axios'
import { baseURL } from '@/app/data/url'
import { key } from '@/app/data/globalData'
import CryptoJS from 'crypto-js'
import { checkAuth } from '@/app/data/checkAuth'
import { useRouter } from 'next/navigation'

const AddFamily = () => {
  const encrypted_token = localStorage.getItem('token')
  let decrypted_token

  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  }

  const config = { headers: { Authorization: `token ${decrypted_token}` } }

  //this useEffect checks if user is logged in
  const navigate = useRouter('/')
  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate.push('/auth/login')
      }
    })
  }, [])

  const [familyInfo, setFamilyInfo] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    workNumber: '',
    homeNumber: '',
    phoneNumber: '',
    address: '',
    state: '',
    country: '',
    zip_code: '',
    add_info: '',
  })

  const fnRef = useRef(null)
  const lnRef = useRef(null)
  const gender = useRef(null)
  const emailRef = useRef(null)
  const workNumber = useRef(null)
  const homeNumber = useRef(null)
  const phoneNumberRef = useRef(null)
  const addressRef = useRef(null)
  const stateRef = useRef(null)
  const countryRef = useRef(null)
  const zip_code = useRef(null)
  // const add_info = useRef(null)

  const refs = [
    fnRef,
    lnRef,
    gender,
    emailRef,
    workNumber,
    homeNumber,
    phoneNumberRef,
    addressRef,
    stateRef,
    countryRef,
    zip_code,
    // add_info,
  ]

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFamilyInfo({ ...familyInfo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const keys = Object.keys(familyInfo)
    for (let prop in familyInfo) {
      const index = keys.indexOf(prop)
      if (!(index > 10)) {
        if (familyInfo[prop] === '') {
          refs[index].current.placeholder = "this field can't be empty"
          refs[index].current.className = 'reg-form-input-error'
        } else {
          refs[index].current.placeholder = ''
          refs[index].current.className = 'reg-form-input'
        }
      }
    }

    const email_is_valid = validateEmail(familyInfo['email'])
    if (email_is_valid) {
      console.log('valid email')
      // const adminID = JSON.parse(localStorage.getItem('user_info'))['id']
      const branch = JSON.parse(localStorage.getItem('branchInfo'))['id']
      const newFamilyInfo = { ...familyInfo, branch }
      console.log('family info', newFamilyInfo)

      axios
        .post(`${baseURL}${'parent/'}`, newFamilyInfo, config)
        .then((resp) => {
          console.log(resp)
          const data = resp.data
          if (resp.status === 201) {
            navigate.push(`/master-admin/family-profile/${data.id}`)
          }
        })
        .catch((err) => console.log(err))
    } else {
      const email_index = keys.indexOf('email')
      setFamilyInfo({ ...familyInfo, email: '' })
      refs[email_index].current.placeholder = 'enter a valid email'
      refs[email_index].current.className = 'reg-form-input-error'
    }
  }

  return (
    <div>
      <h1 className='class-page-subheading text-2xl'>Add New Family</h1>
      <p className='class-paragraph'>
        Use the below form to add new family to your database
      </p>

      <h2 className='class-page-subheading mt-5'>
        Add employee career information
      </h2>
      <article className='class-paragraph'>
        Use this form to add information about the child student family.. Use
        this form to add families. After adding a family you will be able to add
        child students to it. You can also select permissions for the family.
      </article>

      <section className='mt-9'>
        <form className=' w-full xs:flex-col md:flex-row gap-5 md:justify-start'>
          {/* family's personal info */}
          <section>
            <h2 className='class-page-subheading mb-1 mt-5'>
              Add family details
            </h2>
            <p className='class-paragraph mt-1'>
              Input the family's name and contact information in this section.
            </p>

            <main className='xs:flex xs:flex-col md:grid md:grid-cols-12 md:gap-x-10 gap-y-8 mt-3'>
              {familyRegData.map((data) => {
                const { id, label, inputName, placeholder, info, type } = data
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
                      value={familyInfo[inputName]}
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
              <label htmlFor='family-bio' className='class-input-label my-2'>
                Add addition information
              </label>
              <textarea
                placeholder='add additional information'
                className='class-input w-[85vw] md:w-[31.88rem] h-[7.63rem]'
                name='add_info'
                value={familyInfo.add_info}
                onChange={handleChange}
                ref={refs[-1]}
              ></textarea>
            </span>
          </div>
          {/* bio section ends */}
          <footer>
            <SaveGroupBtn handleSubmit={handleSubmit} />
          </footer>
        </form>
      </section>
    </div>
  )
}

export default AddFamily
