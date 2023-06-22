import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import Availability from '../../../components/Availability'
import { availabilityData } from '../../../data/globalData'
import axios from 'axios'
import { checkAuth } from '../../../data/checkAuth'
import { authConfig } from '../../../data/authConfig'
import { useRouter } from 'next/navigation'
import { baseURL } from '../../../data/url'

const ScheduleNewLesson = () => {
  const [availableData, setAvailableData] = useState([])

  const [students, setStudents] = useState([])
  const [tutors, setTutors] = useState([])
  const [classes, setClasses] = useState([])
  const [description, setDescription] = useState('')
  const [showError, setShowError] = useState({
    student: false,
    tutor: false,
    class: false,
  })

  const navigate = useRouter()
  const config = authConfig()

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate.push'/auth/login')
      }
    })
  }, [])

  const handleDelete = (index) => {
    const new_students = students
    new_students.splice(index, 1)
    setStudents([...new_students])
  }
  const SearchBar = ({ apiUrl, currentValue, stateFunc, single, isClass }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (query) {
          search(query)
        } else {
          setResults([])
        }
      }, 300)

      return () => clearTimeout(delayDebounceFn)
    }, [query])

    const search = (query) => {
      const branch_id = JSON.parse(localStorage.getItem('branchInfo'))['id']
      axios
        .get(`${baseURL}${apiUrl}`, {
          params: {
            query: query,
            branch_id,
          },
          ...config,
        })
        .then((response) => {
          const searchData = response.data.map((item) => ({
            id: item.id,
            name: isClass ? item.title : item.full_name,
          }))
          setResults(searchData)
          console.log(results)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const handleItemClick = (data) => {
      const isObjectAlreadyExists = (array, obj) => {
        for (let i = 0; i < array.length; i++) {
          if (isEqual(array[i], obj)) {
            return true // Object already exists
          }
        }
        return false // Object does not exist
      }

      // Utility function to compare two objects
      function isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
      }
      console.log(data)
      if (single === true) {
        stateFunc([data])
      } else {
        if (!isObjectAlreadyExists(currentValue, data)) {
          stateFunc([...currentValue, data])
        } else stateFunc([...currentValue])
      }
    }

    return (
      <div>
        <input
          type='text'
          className='p-3 mb-5 w-[18rem] border border-[#9CA3AF] rounded-md'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <ul>
          {results.map((result) => (
            <li
              key={result.id}
              className='py-3 px-2 bg-slate-200 rounded-md my-2'
              onClick={() => handleItemClick(result)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const StudentSearch = () => {
    const apiUrl = 'search-students/' // API endpoint for searching students

    return (
      <div>
        <label className='class-page-subheading text-lg mb-1'>
          Search Students
        </label>
        <SearchBar
          apiUrl={apiUrl}
          currentValue={students}
          stateFunc={setStudents}
        />
        {showError.student && <p>Please select students</p>}
      </div>
    )
  }

  const TutorSearch = () => {
    const apiUrl = 'search-tutors/' // API endpoint for searching tutors

    return (
      <div>
        <label className='class-page-subheading text-lg mb-1'>
          Search Tutors
        </label>
        <SearchBar
          apiUrl={apiUrl}
          currentValue={tutors}
          stateFunc={setTutors}
          single={true}
        />
        {showError.tutor && <p>Please select tutor</p>}
      </div>
    )
  }
  const ClassSearch = () => {
    const apiUrl = 'search-classes/' // API endpoint for searching tutors

    return (
      <div>
        <label className='class-page-subheading text-lg mb-1'>
          Select a class
        </label>
        <SearchBar
          apiUrl={apiUrl}
          currentValue={classes}
          stateFunc={setClasses}
          single={true}
          isClass={true}
        />
        {showError.class && <p>Please select a class</p>}
      </div>
    )
  }

  const handleSubmit = () => {
    if (students.length !== 0) {
      if (tutors.length !== 0) {
        if (classes.length !== 0) {
          console.log('none is empty')
          const students = [students.map((std) => std.id)]
          const tutor = tutors[0].id
          const availablilityData = JSON.stringify(availableData)
          const branch = JSON.parse(localStorage.getItem('branchInfo'))['id']
          console.log(students)
          axios.post(`${baseURL}schedule-class/`)
        } else setShowError({ ...showError, class: true })
      } else setShowError({ ...showError, tutor: true })
    } else setShowError({ ...showError, student: true })
  }
  return (
    <availabilityData.Provider value={{ availableData, setAvailableData }}>
      <div>
        <header>
          <h1 className='class-page-subheading mb-1'>Schedule New Lesson</h1>
          <footer className='class-paragraph text-sm'>
            Use the form to Schedule lesson for a student
          </footer>
        </header>

        <main className='mt-10 bg-[#F9FAFB] rounded-[15px] p-5'>
          <header>
            <h2 className='class-page-subheading mb-0'>Select Student</h2>
            <footer className='class-paragraph text-sm'>
              Select the students you want to setup a lesson for. Note you can
              only schedule a lesson for student that has been registered as
              student.
            </footer>
          </header>

          <section className='mt-10 flex flex-wrap gap-4'>
            {/* select student */}
            <div className='mt-5  '>
              <span className='flex flex-col '>
                <StudentSearch />
              </span>
              {students.map((student, index) => {
                return (
                  <section
                    className='flex gap-3 flex-wrap md:w-[35rem] m-2'
                    key={student.id}
                  >
                    <span className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'>
                      <p className='text-base'>{student.name}</p>
                      <button onClick={() => handleDelete(index)}>
                        <MdCancel />
                      </button>
                    </span>
                  </section>
                )
              })}
            </div>
            {/* select student ends  */}

            {/* select tutor */}

            <div className='mt-5 '>
              <span className='flex flex-col '>
                <TutorSearch />
              </span>
              {tutors.map((tutor) => {
                return (
                  <section
                    className='flex gap-3 flex-wrap md:w-[35rem] m-2'
                    key={tutor.id}
                  >
                    <span className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'>
                      <p className='text-base'>{tutor.name}</p>
                      <button
                        onClick={() => {
                          setTutors([])
                        }}
                      >
                        <MdCancel />
                      </button>
                    </span>
                  </section>
                )
              })}
            </div>
            {/* select tutor ends */}
          </section>

          <section className='bg-[#FAF5F5] mt-11 xs:px-[10px] md:py-[20px] px-[15px]'>
            <h2 className='class-page-subheading mb-2'>Schedule Lesson</h2>
            <footer className='class-paragraph text-sm tracking-wide'>
              Assign student to class(es)
            </footer>

            <section className='flex flex-wrap xs:gap-[2rem] md:gap-[5rem] mt-14 '>
              <section>
                <ClassSearch />
                {classes.map((item) => {
                  return (
                    <section
                      className='flex gap-3 flex-wrap md:w-[35rem] m-2'
                      key={item.id}
                    >
                      <span className='flex items-center gap-1 font-semibold bg-[#E5E7EB] w-fit h-[2.25rem] py-[6px] px-[10px] rounded-md border border-[#D1D5DB]'>
                        <p className='text-base'>{item.name}</p>
                        <button
                          onClick={() => {
                            setClasses([])
                          }}
                        >
                          <MdCancel />
                        </button>
                      </span>
                    </section>
                  )
                })}
              </section>

              <span className='flex flex-col gap-1'>
                <label
                  htmlFor='assign-class'
                  className='text-[#1F2937] font-semibold'
                >
                  Lesson Type
                </label>
                <select className='py-[10px] px-[14px]  md:w-[19.25rem] border border-[#9CA3AF] rounded-md'>
                  <option>Select lesson type</option>
                  <option>Private Lesson</option>
                  <option>Group Lesson</option>
                </select>
              </span>
            </section>
            <span>
              <textarea
                placeholder='class description'
                className='class-input md:w-[31.88rem] h-[7.63rem] mt-5'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </span>

            <Availability />
          </section>
          <div className='flex flex-col gap-2 justify-center mt-3'>
            <button className='py-[10px] px-[30px] border border-[#BF011B] w-fit rounded-[10px] text-[#BF011B]'>
              Add New Lesson Schedule
            </button>
            <button
              className='py-[10px] px-[40px] button w-fit'
              onClick={handleSubmit}
            >
              Save Schedule
            </button>
          </div>
        </main>
      </div>
    </availabilityData.Provider>
  )
}

export default ScheduleNewLesson
