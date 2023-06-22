import React, { useState, useEffect } from 'react'
import Badge from '../../../components/Badge'
import { Link, useNavigate } from 'react-router-dom'
import { checkAuth } from '../../../data/checkAuth'
import axios from 'axios'
import { baseURL } from '../../../data/url'
import { authConfig } from '../../../data/authConfig'
import { v4 as uuidv4 } from 'uuid'

const AllFamilies = () => {
  const navigate = useNavigate()
  const config = authConfig()

  const [familyLists, setFamilyLists] = useState([])
  const branch = JSON.parse(localStorage.getItem('branchInfo'))['id']

  // this function handles btn navigating to enrolling page
  const handleFamEnroll = () => {
    navigate('/master-admin/add-family')
  }

  useEffect(() => {
    checkAuth().then(() => {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        navigate('/auth/login')
      }
    })
  }, [])

  useEffect(() => {
    axios
      .get(`${baseURL}get-list/families/${branch}`, config)
      .then((resp) => {
        console.log(JSON.parse(resp.data).reverse())
        setFamilyLists(JSON.parse(resp.data).reverse())
      })
      .catch((err) => {
        if (err.status == 401) {
          navigate('/auth/login')
        }
      })
  }, [])

  const FamilyTable = () => {
    return (
      <div className='overflow-auto mt-5'>
        <table className='w-full text-[#1F2937] tracking-[-0.02rem]'>
          <thead className='bg-[#F3F4F6] font-semibold'>
            <tr className='text-center'>
              <th>
                <input type='checkbox' />
              </th>
              <th className='whitespace-nowrap p-3 text-left'>Name</th>
              <th className='whitespace-nowrap p-3 text-left'>Child No</th>
              <th className='whitespace-nowrap p-3 text-left'>Contact</th>
              <th className='whitespace-nowrap p-3 text-left'>Email</th>
              <th className='whitespace-nowrap p-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody className='whitespace-nowrap text-sm divide-y divide-gray-300'>
            {familyLists.map((family) => {
              return (
                <tr key={uuidv4()}>
                  <td className='p-3'>
                    <input type='checkbox' />
                  </td>

                  {/* I have to discuss the look of the tables on mobile because of how long class names can get */}
                  {/* a good solution is to make limit to how long a class name can get or make use of cards instead of tables */}
                  <td className='p-3'>
                    <span className='flex gap-2 items-center'>
                      <img
                        src='https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'
                        className='rounded-full w-10'
                      />
                      <p className='xs:mr-9 md:mr-0 font-bold'>
                        <Link to={`/master-admin/family-profile/${family.id}`}>
                          {`${family.firstName} ${family.lastName}`}
                        </Link>
                      </p>
                    </span>
                  </td>
                  <td className='p-3'>4</td>
                  <td className='p-3'>{family.phoneNumber}</td>
                  <td className='p-3'>{family.email}</td>
                  <td className='p-3'>
                    <Badge status='inactive' />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <span className='flex flex-col gap-2'>
        <h1 className='font-semibold text-[16px] text-[#031F42]'>Families</h1>
        <h4 className='font-normal text-[#4B5563] text-sm tracking-tighter'>
          Here is a list of all your families
        </h4>
      </span>

      <section>
        <div className='flex justify-between mt-3'>
          <h3 className='class-page-subheading text-[16px]'>All Families</h3>
          <input
            type='text'
            placeholder='search for family'
            className='reg-form-input h-10 xs:w-full md:w-[23.5rem] px-2'
          />
        </div>
      </section>
      {familyLists.length !== 0 ? (
        <FamilyTable />
      ) : (
        <div className=''>
          <p className='font-semibold text-2xl'>
            No family have been registred yet
          </p>
          <button className='button mt-3' onClick={handleFamEnroll}>
            Register
          </button>
        </div>
      )}
      <section className='flex flex-col md:flex-row gap-3 mt-6'>
        <select className='border rounded-md text-sm h-[38px]'>
          <option>View family</option>
          <option>Edit family</option>
          <option>Delete family</option>
          <option>Deactivate family</option>
        </select>
        <button className='button h-[38px] text-center py-[5px] px-[62px]'>
          Apply
        </button>
      </section>
    </div>
  )
}

export default AllFamilies
