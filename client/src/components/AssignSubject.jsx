import React, { useState, useContext, useEffect } from 'react'
import { MdCancel } from 'react-icons/md'
import { subjectData } from '../data/globalData'
import { v4 as uuidv4 } from 'uuid'

const AssignSubject = () => {
  const [subjectInput, setSubjectInput] = useState('')
  const { subjects, setSubjects } = useContext(subjectData)
  const [loadList, setLoadList] = useState(false)
  const [Index, setIndex] = useState()

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      if (subjectInput.length > 1) {
        setSubjects([...subjects, subjectInput])
        setSubjectInput('')
      }
    }
  }

  const removeSubject = (index) => {
    setIndex(index)
    setLoadList(true)
  }

  useEffect(() => {
    if (loadList === true) {
      subjects.splice(Index, 1)
      setSubjects(subjects)
      setLoadList(false)
    }
  }, [loadList])

  return (
    <div>
      <main className='mt-4'>
        <h3 className='class-page-subheading text-lg'>Assign Subject(s)</h3>
        <div className='xs:w-[19.27rem] md:w-[29.44rem] h-[7.5rem] rounded-xl border p-3 flex flex-wrap gap-2 overflow-auto'>
          {subjects.map((subject, index) => {
            return (
              <span
                className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'
                key={uuidv4()}
              >
                <p className='text-base'>{subject}</p>
                <button onClick={() => removeSubject(index)}>
                  <MdCancel />
                </button>
              </span>
            )
          })}

          <input
            type='text'
            value={subjectInput}
            id='subject-input'
            onChange={(e) => setSubjectInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder='enter a subject'
            className='outline-none h-[2.25rem] '
          />
        </div>
      </main>
    </div>
  )
}

export default AssignSubject
