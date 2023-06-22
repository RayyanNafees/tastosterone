import React from 'react'

const SaveGroupBtn = (prop) => {
  return (
    <footer className='flex xs:flex-col md:flex-row gap-4 my-5'>
      <button className='button w-fit' onClick={prop.handleSubmit}>
        Save
      </button>
      <button className='button w-fit bg-[#BF011B]'>Save & add another</button>
    </footer>
  )
}

export default SaveGroupBtn
