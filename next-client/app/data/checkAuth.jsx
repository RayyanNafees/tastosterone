import axios from 'axios'
import { baseURL } from './url'
import CryptoJS from 'crypto-js'
import { key } from '../data/globalData'

export const checkAuth = async () => {
  const encrypted_token = localStorage.getItem('token')
  // console.log(token)
  let decrypted_token

  //tyring to make sure the token is in the localStorage and avoiding any eror
  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  } else {
    return false
  }

  const config = {
    headers: { Authorization: `token ${decrypted_token}` },
  }

  return axios
    .get(`${baseURL}auth/isValid`, config)
    .then((resp) => {
      if (resp.status === 200) {
        if (resp.data['auth'] === true) {
          console.log('login is true')
          localStorage.setItem('isLoggedIn', true)
        }
      } else {
        localStorage.setItem('isLoggedIn', false)
      }
    })
    .catch((err) => {
      console.log(err.response)
      console.log('login invalid')
      localStorage.setItem('isLoggedIn', false)
    })
}

// const Email = localStorage.getItem('email')
// console.log('check branch', Email)
export const check_if_branch = (email) => {
  localStorage.removeItem('branchInfo')
  localStorage.removeItem('isBranch')

  console.log(email)

  const encrypted_token = localStorage.getItem('token')

  let decrypted_token

  //tyring to make sure the token is in the localStorage and avoiding any eror
  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  }
  const config = {
    headers: { Authorization: `token ${decrypted_token}` },
  }

  return axios
    .get(`${baseURL}master/validate-branch/${email}`, config)
    .then((resp) => {
      console.log('in check branch', resp)
      if (resp.status === 200) {
        console.log('there is branch')
        localStorage.setItem('isBranch', true)
        localStorage.setItem('branchInfo', JSON.stringify(resp.data))
      }
    })
    .catch((err) => {
      console.error('in check branch error', err)
      localStorage.setItem('isBranch', false)
      localStorage.removeItem('branchInfo')
    })
}
