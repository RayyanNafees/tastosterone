import React from 'react'
import { useNavigate } from 'react-router-dom'

const Branch404 = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/branch-admin/branch-reg')
  }
  return (
    <div className='flex items-center flex-col mt-10 text-center'>
      <h1 className='class-page-subheading text-3xl'>
        You have not registered a branch yet!
      </h1>
      <h2 className='class-page-subheading'>Click the button below</h2>
      <button className='button' onClick={handleClick}>
        Add a Branch
      </button>
    </div>
  )
}

export default Branch404
