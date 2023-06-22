import React from 'react'

const WelcomeOrg = () => {
  return (
    <div className='border border-black w-screen h-screen p-1'>
      <TopLogo />
      <MainBody />
    </div>
  )
}

const TopLogo = () => {
  return <div className='h-[3.13rem]'>logo</div>
}

const MainBody = () => {
  return (
    <div className='pt-2 pb-5 px-2 h-[calc(100%-3.13rem)] bg-[#D1D5DB] rounded-[10px]'>
      <main className=' bg-white rounded-[10px] h-[calc(100%-1.5rem)] overflow-y-auto'>
        <header className='text-center text-[#4B5563] h-[5.13rem] bg-opaque-red'>
          <h1 className='text-[#4B5563] font-semibold text-lg '>
            Welcome to TAS platform
          </h1>
          <p className='text-xs font-normal mt-3'>
            Managing your tutoring business is our concern
          </p>
        </header>

        <main className='border border-red-300 m-3 mt-10 overflow-y-scroll'>
          <h1 className='text-lg text-[#031F42] font-semibold'>
            Let's start with the basics
          </h1>
          <h2 className='text-sm font-normal leading-7 text-[#4B5563]'>
            Kindly answer the basic questions to help us understand your needs!
          </h2>
          <RoleDescr />
        </main>
      </main>
    </div>
  )
}

// role description options (component)
const RoleDescr = () => {
  return (
    <section className='mt-7'>
      <div className='my-3'>
        <label>
          <h1 className='font-semibold text-[#1F2937] text-sm'>
            What category best describes your role?
          </h1>
        </label>
        <select className='select-input'>
          <option>Teacher</option>
          <option>Director</option>
          <option>HR</option>
        </select>
      </div>

      <div className='my-3'>
        <label>
          <h1 className='font-semibold text-[#1F2937] text-sm'>
            What industry best describe your organisation?
          </h1>
        </label>
        <select className='select-input'>
          <option>Elementary School</option>
          <option>Vocational School</option>
          <option>Special School</option>
        </select>
      </div>

      <PrimaryUse />
    </section>
  )
}

const PrimaryUse = () => {
  return (
    <div>
      <h2 className='text-[#4B5563] text-base tracking-tight leading-7'>
        What do you primarily want to use TAS platform for? (Select all that
        apply)
      </h2>

      <section>
        <div className='flex items-centern justify-start  text-[#4B5563]'>
          <input type='checkbox' name='' id='allow-client' className='mr-1' />
          <label for='allow-client' className='text-sm leading-7'>
            Allow your clients to easily book lessons.
          </label>
        </div>
        <div className='flex items-centern justify-start  text-[#4B5563]'>
          <input type='checkbox' name='' id='allow-client' className='mr-1' />
          <label for='allow-client' className='text-sm leading-7'>
            Speed up scheduling for one-on-one and group lessons
          </label>
        </div>
        <div className='flex items-centern justify-start  text-[#4B5563]'>
          <input type='checkbox' name='' id='allow-client' className='mr-1' />
          <label for='allow-client' className='text-sm leading-7'>
            Speed up scheduling for one-on-one and group lessons
          </label>
        </div>
      </section>
    </div>
  )
}
export default WelcomeOrg
