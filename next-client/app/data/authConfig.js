import CryptoJS from 'crypto-js'
import { key } from './globalData'

// this function is for decrypting the encrypted user authentication token
export const authConfig = () => {
  const encrypted_token = localStorage.getItem('token')
  let decrypted_token

  if (encrypted_token !== null) {
    decrypted_token = CryptoJS.AES.decrypt(encrypted_token, key).toString(
      CryptoJS.enc.Utf8
    )
  }
  const config = { headers: { Authorization: `token ${decrypted_token}` } }
  return config
}
