import React, { useState, useContext, useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import { availabilityData } from '../data/globalData'
import { v4 as uuidv4 } from 'uuid'

const Availability = () => {
  const { availableData, setAvailableData } = useContext(availabilityData)
  const [available, setAvailable] = useState({
    day: '',
    startingTime: '',
    endingTime: '',
  })

  const [showError, setShowError] = useState(false)
  const [loadList, setLoadList] = useState(false)
  const [Index, setIndex] = useState()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAvailable({ ...available, [name]: value })
  }

  const handleClear = () => {
    setAvailable({ day: '', startingTime: '', endingTime: '' })
  }

  const removeAvailability = (index) => {
    setIndex(index)
    setLoadList(true)
  }

  useEffect(() => {
    if (loadList === true) {
      availableData.splice(Index, 1)
      setAvailableData(availableData)
      setLoadList(false)
    }
  }, [loadList])

  const checkAvailabilityData = () => {
    for (let key in available) {
      if (
        available[key] === null ||
        available[key] === undefined ||
        available[key] === ''
      ) {
        return false
      }
    }
    return true
  }

  const AddAvailability = () => {
    if (checkAvailabilityData()) {
      setShowError(false)
      const new_entry = [
        available.day,
        available.startingTime,
        available.endingTime,
      ]
      setAvailableData([...availableData, new_entry])
      handleClear()
    } else {
      setShowError(true)
    }
  }

  const Available = () => {
    return (
      <>
        <main className='flex gap-7 flex-wrap'>
          <span>
            <h4 className='class-page-subheading text-base mb-2'>
              Available Day
            </h4>
            <select
              className='border rounded-md text-sm h-13 mt-1 p-3'
              value={available.day}
              onChange={handleChange}
              name='day'
            >
              <option value=''>Day</option>
              <option value='Monday'>Monday</option>
              <option value='Tuesday'>Tuesday</option>
              <option value='Wednesday'>Wednesday</option>
              <option value='Thurday'>Thurday</option>
              <option value='Friday'>Friday</option>
              <option value='Saturday'>Saturday</option>
            </select>
          </span>

          <span>
            <section>
              <h4 className='class-page-subheading text-base mb-3'>
                Starting and Ending Time
              </h4>
              {/* fix here  */}
              <div className='flex flex-wrap'>
                {/* fix here */}
                <span className='flex gap-3'>
                  <input
                    type='time'
                    name='startingTime'
                    id='startingTime'
                    className='border h-13 p-3'
                    value={available.startingTime}
                    onChange={handleChange}
                  />
                  <p className='class-paragraph font-bold'>to</p>
                  <input
                    type='time'
                    name='endingTime'
                    id='endingTime'
                    className='border h-13 p-3'
                    value={available.endingTime}
                    onChange={handleChange}
                  />
                </span>

                <button
                  className='text-[#BF011B] text-lg ml-6 flex items-center gap-2 '
                  onClick={handleClear}
                >
                  <p>clear</p>
                  <span className='text-[#031F42]'>
                    <MdCancel />
                  </span>
                </button>
              </div>
            </section>
          </span>
        </main>

        {showError && (
          <p className='font-medium text-red-700'>
            Please input the day and time range
          </p>
        )}

        <section className='flex flex-wrap gap-3 p-2'>
          {availableData.map((data, index) => {
            const [day, from, to] = data
            return (
              <span className='bg-slate-200 p-2 rounded-md' key={uuidv4()}>
                <p>{day}</p>
                <p>{`${from} - ${to}`}</p>
                <button
                  onClick={() => removeAvailability(index)}
                  className='mt-1 px-2 py-1 border-2 border-[#fff] rounded-md font-semibold'
                >
                  Delete
                </button>
              </span>
            )
          })}
        </section>
      </>
    )
  }

  return (
    <div className='mt-5'>
      <h3 className='class-page-subheading mb-0'>Availability</h3>
      <p className='class-paragraph'>
        Available times will be displayed on the calendar and used to check for
        conflicts when scheduling. If you leave these fields blank, then will be
        considered available for all times.
      </p>

      <Available />

      <button
        className='flex items-center justify-start gap-2 font-semibold text-red-700 my-6'
        onClick={AddAvailability}
      >
        <BiPlus />
        <p>Save and Add another availability</p>
      </button>
    </div>
  )
}

export default Availability
