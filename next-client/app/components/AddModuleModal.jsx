import React, { useState, useContext } from 'react'
import { HiPlus } from 'react-icons/hi'
import { ModuleContext } from '../pages/MasterAdmin/class/AddClasses'

const AddModuleModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [input, setInput] = useState({ title: '', description: '' })
  const { moduleData, setModuleData } = useContext(ModuleContext)
  const [showError, setShowError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = () => {
    if (input.title && input.description) {
      setModuleData([...moduleData, input])
      setShowError(false)
      setOpen(false)
    } else {
      setShowError(true)
    }
  }

  return (
    <div>
      <button onClick={handleOpen}>
        <section className='flex items-center gap-2 tracking-[-0.02rem] mt-7 text-[#BF011B] text-xl'>
          <HiPlus className='text-2xl' />
          <p className='font-semibold'>Add module</p>
        </section>
      </button>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={handleClose}
          ></div>
          <div className='bg-white rounded-lg shadow-lg p-6 mx-4 md:mx-auto md:max-w-2xl z-10'>
            <header>
              <h1 className='class-page-subheading mb-1'>Add Module</h1>
              <footer className='class-paragraph text-base'>
                Enter the module title and description
              </footer>
            </header>
            <main className='flex flex-col gap-4 mt-5'>
              <section>
                <label className='text-[#4B5563] font-semibold'>
                  Module title
                </label>
                <input
                  className='class-input'
                  name='title'
                  value={input['title']}
                  onChange={handleChange}
                />
              </section>
              <section className='flex flex-col'>
                <label className='text-[#1F2937] font-semibold'>
                  Description
                </label>
                <textarea
                  name='description'
                  id='description'
                  cols='30'
                  rows='10'
                  maxLength='50'
                  className='class-input h-[7.63rem]'
                  value={input['description']}
                  onChange={handleChange}
                ></textarea>
              </section>
            </main>
            {showError && (
              <section className='mt-2 text-[#BF011B] font-semibold'>
                <p>Enter Title and description</p>
              </section>
            )}

            <footer>
              <button className='button mt-4 ' onClick={handleSubmit}>
                Save
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddModuleModal
