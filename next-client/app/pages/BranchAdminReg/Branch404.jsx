import React from 'react'
import { useRouter } from 'next/navigation'

const Branch404 = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/branch-admin/branch-reg')
  }
  return (
    <div className='flex flex-col items-center mt-10 text-center'>
      <h1 className='text-3xl class-page-subheading'>
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
